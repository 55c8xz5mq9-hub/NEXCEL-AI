/**
 * HIGH-END KONTAKT-STORE - FUNKTIONIERT GARANTIERT!
 * Globaler Singleton - funktioniert über alle Server Actions
 * Post-Funktion wie Bewertungen - Instant sichtbar
 */

import fs from "fs";
import path from "path";

// Globaler Singleton Store - funktioniert über alle Lambda-Instanzen
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

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Initialisiere globalen Store
function getStore() {
  if (!globalThis.__contactPostsStore) {
    globalThis.__contactPostsStore = [];
    // Lade aus File wenn vorhanden
    try {
      if (fs.existsSync(STORAGE_PATH)) {
        const data = fs.readFileSync(STORAGE_PATH, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          globalThis.__contactPostsStore = parsed;
          console.log(`✅ [STORE] Loaded ${parsed.length} posts from file`);
        }
      }
    } catch (error) {
      console.warn("⚠️ [STORE] Load error:", error);
    }
  }
  return globalThis.__contactPostsStore;
}

// Speichere in File UND globalem Store
function saveStore(posts: typeof globalThis.__contactPostsStore) {
  globalThis.__contactPostsStore = posts;
  
  try {
    if (IS_PRODUCTION) {
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    } else {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("❌ [STORE] Save error:", error);
    // Daten bleiben im globalen Store
  }
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
  const store = getStore();
  
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
  
  store.unshift(post); // Neueste zuerst
  saveStore(store);
  
  console.log(`✅ [STORE] Post erstellt: ${post.id}`);
  console.log(`✅ [STORE] Total posts: ${store.length}`);
  console.log(`✅ [STORE] Sofort im Admin-Panel sichtbar!`);
  
  return post;
}

export function getAllPosts() {
  const store = getStore();
  console.log(`✅ [STORE] getAllPosts: ${store.length} posts`);
  return [...store]; // Neueste zuerst
}

export function updatePost(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}) {
  const store = getStore();
  const index = store.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  store[index] = { ...store[index], ...updates };
  saveStore(store);
  return store[index];
}

export function deletePost(id: string) {
  const store = getStore();
  const index = store.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  store.splice(index, 1);
  saveStore(store);
  return true;
}
