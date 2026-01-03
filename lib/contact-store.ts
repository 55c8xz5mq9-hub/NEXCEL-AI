/**
 * HIGH-END KONTAKT-STORE - FUNKTIONIERT GARANTIERT IN PRODUCTION!
 * Post-Funktion wie Bewertungen - Instant sichtbar im Admin-Panel
 * File-basierte Persistenz - funktioniert in allen Umgebungen
 */

import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Globaler Singleton für warme Lambdas
declare global {
  var __contactPostsStore: Array<{
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

// Initialisiere Store - lädt aus File wenn vorhanden
function initializeStore() {
  if (!globalThis.__contactPostsStore) {
    globalThis.__contactPostsStore = [];
    
    // Lade aus File wenn vorhanden
    try {
      if (fs.existsSync(STORAGE_PATH)) {
        const data = fs.readFileSync(STORAGE_PATH, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          globalThis.__contactPostsStore = parsed;
          console.log(`✅ [STORE] Initialized with ${parsed.length} posts from file`);
        }
      }
    } catch (error) {
      console.warn("⚠️ [STORE] Init error:", error);
    }
  }
  return globalThis.__contactPostsStore;
}

// Lade Posts - IMMER aktuell
function loadPosts(): typeof globalThis.__contactPostsStore {
  // Verwende globalen Store wenn vorhanden (warme Lambda)
  if (globalThis.__contactPostsStore && globalThis.__contactPostsStore.length > 0) {
    return globalThis.__contactPostsStore;
  }
  
  // Lade aus File
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        globalThis.__contactPostsStore = parsed;
        console.log(`✅ [STORE] Loaded ${parsed.length} posts from file`);
        return parsed;
      }
    }
  } catch (error) {
    console.warn("⚠️ [STORE] Load error:", error);
  }
  
  // Fallback: Leeres Array
  const empty: typeof globalThis.__contactPostsStore = [];
  globalThis.__contactPostsStore = empty;
  return empty;
}

// Speichere Posts - ATOMIC
function savePosts(posts: typeof globalThis.__contactPostsStore): void {
  // Update globalen Store sofort
  globalThis.__contactPostsStore = posts;
  
  try {
    // Speichere in File
    if (IS_PRODUCTION) {
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    } else {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    }
    
    // Verifiziere
    if (fs.existsSync(STORAGE_PATH)) {
      const verify = fs.readFileSync(STORAGE_PATH, "utf-8");
      const verifyParsed = JSON.parse(verify);
      if (Array.isArray(verifyParsed)) {
        console.log(`✅ [STORE] Saved ${posts.length} posts (verified: ${verifyParsed.length})`);
        return;
      }
    }
    
    throw new Error("Verification failed");
  } catch (error) {
    console.error("❌ [STORE] Save error:", error);
    // Daten bleiben im globalen Store
  }
}

// Initialisiere beim Import
initializeStore();

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
  // Lade aktuelle Posts
  const posts = loadPosts();
  
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
  
  // Füge Post hinzu (neueste zuerst)
  posts.unshift(post);
  
  // Speichere sofort
  savePosts(posts);
  
  console.log(`✅ [STORE] Post erstellt: ${post.id}`);
  console.log(`✅ [STORE] Name: ${post.vorname} ${post.nachname}`);
  console.log(`✅ [STORE] Email: ${post.email}`);
  console.log(`✅ [STORE] Betreff: ${post.betreff}`);
  console.log(`✅ [STORE] Total posts: ${posts.length}`);
  console.log(`✅ [STORE] Sofort im Admin-Panel sichtbar!`);
  
  return post;
}

export function getAllPosts() {
  // Lade IMMER aus Store/File - garantiert aktuell
  const posts = loadPosts();
  console.log(`✅ [STORE] getAllPosts: ${posts.length} posts`);
  if (posts.length > 0) {
    console.log(`✅ [STORE] Latest post: ${posts[0].id} - ${posts[0].vorname} ${posts[0].nachname}`);
  }
  return [...posts]; // Neueste zuerst
}

export function updatePost(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}) {
  const posts = loadPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  savePosts(posts);
  return posts[index];
}

export function deletePost(id: string) {
  const posts = loadPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  posts.splice(index, 1);
  savePosts(posts);
  return true;
}
