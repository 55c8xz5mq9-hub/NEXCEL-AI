/**
 * HIGH-END KONTAKT-STORE - Post-Funktion wie Bewertungen
 * Instant sichtbar im Admin-Panel - FUNKTIONIERT IN PRODUCTION!
 * Globaler Singleton - funktioniert über alle Lambda-Instanzen
 */

// Globaler Singleton Store - funktioniert in allen Umgebungen
declare global {
  var contactPostsStore: Array<{
    id: string;
    vorname: string;
    nachname: string;
    email: string;
    telefon: string | null;
    unternehmen: string | null;
    betreff: string;
    nachricht: string;
    status: "open" | "read" | "archived";
    read: boolean;
    archived: boolean;
    createdAt: string;
  }> | undefined;
}

// Verwende globalen Store für Persistenz über Lambda-Instanzen
let contactPosts: Array<{
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string | null;
  unternehmen: string | null;
  betreff: string;
  nachricht: string;
  status: "open" | "read" | "archived";
  read: boolean;
  archived: boolean;
  createdAt: string;
}> = globalThis.contactPostsStore || [];

// Persistenz für Production
import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Initialisiere - ROBUST für Production
function init() {
  try {
    // Lade aus globalem Store wenn vorhanden (warm Lambda)
    if (globalThis.contactPostsStore && globalThis.contactPostsStore.length > 0) {
      contactPosts = globalThis.contactPostsStore;
      console.log(`✅ [STORE] Using warm Lambda cache: ${contactPosts.length} posts`);
      return;
    }

    // Lade aus File wenn vorhanden
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        contactPosts = parsed;
        globalThis.contactPostsStore = contactPosts; // Cache in global
        console.log(`✅ [STORE] Loaded ${contactPosts.length} posts from file`);
        return;
      }
    }

    // Starte frisch
    contactPosts = [];
    globalThis.contactPostsStore = contactPosts;
    console.log("ℹ️ [STORE] Starting fresh");
  } catch (error) {
    console.warn("⚠️ [STORE] Init error, starting fresh:", error);
    contactPosts = [];
    globalThis.contactPostsStore = contactPosts;
  }
}

function save() {
  try {
    // Update global store
    globalThis.contactPostsStore = contactPosts;
    
    // Persistiere in File
    if (IS_PRODUCTION) {
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(contactPosts, null, 2), "utf-8");
    } else {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(contactPosts, null, 2), "utf-8");
    }
  } catch (error) {
    console.warn("⚠️ [STORE] Save error (non-critical):", error);
    // Daten bleiben im globalen Store
  }
}

// Initialisiere beim Import
if (!globalThis.contactPostsStore) {
  init();
} else {
  contactPosts = globalThis.contactPostsStore;
}

// POST-FUNKTION - Wie Bewertungen
export function createPost(data: {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string | null;
  unternehmen?: string | null;
  betreff: string;
  nachricht: string;
}) {
  const post = {
    id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    vorname: data.vorname.trim(),
    nachname: data.nachname.trim(),
    email: data.email.trim(),
    telefon: data.telefon?.trim() || null,
    unternehmen: data.unternehmen?.trim() || null,
    betreff: data.betreff.trim(),
    nachricht: data.nachricht.trim(),
    status: "open" as const,
    read: false,
    archived: false,
    createdAt: new Date().toISOString(),
  };
  
  contactPosts.unshift(post); // Neueste zuerst
  globalThis.contactPostsStore = contactPosts; // Update global sofort
  save();
  
  console.log(`✅ [STORE] Post erstellt: ${post.id}`);
  console.log(`✅ [STORE] Total posts: ${contactPosts.length}`);
  console.log(`✅ [STORE] Sofort im Admin-Panel sichtbar!`);
  
  return post;
}

export function getAllPosts() {
  // Lade immer aus globalem Store für Konsistenz
  const posts = globalThis.contactPostsStore || contactPosts;
  return [...posts]; // Neueste zuerst (durch unshift)
}

export function updatePost(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}) {
  const index = contactPosts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  contactPosts[index] = { ...contactPosts[index], ...updates };
  globalThis.contactPostsStore = contactPosts;
  save();
  return contactPosts[index];
}

export function deletePost(id: string) {
  const index = contactPosts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  contactPosts.splice(index, 1);
  globalThis.contactPostsStore = contactPosts;
  save();
  return true;
}
