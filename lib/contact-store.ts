/**
 * HIGH-END KONTAKT-STORE - Post-Funktion wie Bewertungen
 * Instant sichtbar im Admin-Panel - Alles im Backend
 */

// Globaler In-Memory Store - funktioniert in allen Umgebungen
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
}> = [];

// Persistenz
import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Initialisiere - ROBUST für Production
function init() {
  try {
    if (IS_PRODUCTION) {
      // Production: /tmp
      if (fs.existsSync(STORAGE_PATH)) {
        const data = fs.readFileSync(STORAGE_PATH, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          contactPosts = parsed;
          console.log(`✅ [STORE] Loaded ${contactPosts.length} posts from /tmp`);
        } else {
          contactPosts = [];
        }
      } else {
        contactPosts = [];
        console.log("ℹ️ [STORE] Starting fresh in production");
      }
    } else {
      // Local: data/
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      
      if (fs.existsSync(STORAGE_PATH)) {
        const data = fs.readFileSync(STORAGE_PATH, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          contactPosts = parsed;
          console.log(`✅ [STORE] Loaded ${contactPosts.length} posts from file`);
        } else {
          contactPosts = [];
        }
      } else {
        contactPosts = [];
        console.log("ℹ️ [STORE] Starting fresh locally");
      }
    }
  } catch (error) {
    console.warn("⚠️ [STORE] Init error, starting fresh:", error);
    contactPosts = [];
  }
}

function save() {
  try {
    if (IS_PRODUCTION) {
      // Production: /tmp ist immer verfügbar
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(contactPosts, null, 2), "utf-8");
    } else {
      // Local: Erstelle Verzeichnis wenn nötig
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(contactPosts, null, 2), "utf-8");
    }
  } catch (error) {
    // Non-critical - Daten bleiben im Memory
    console.warn("⚠️ [STORE] Save error (non-critical):", error);
  }
}

init();

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
  save();
  
  console.log(`✅ [STORE] Post erstellt: ${post.id} - Sofort sichtbar!`);
  return post;
}

export function getAllPosts() {
  return [...contactPosts];
}

export function updatePost(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}) {
  const index = contactPosts.findIndex(p => p.id === id);
  if (index === -1) return null;
  contactPosts[index] = { ...contactPosts[index], ...updates };
  save();
  return contactPosts[index];
}

export function deletePost(id: string) {
  const index = contactPosts.findIndex(p => p.id === id);
  if (index === -1) return false;
  contactPosts.splice(index, 1);
  save();
  return true;
}

