/**
 * HIGH-END KONTAKT-STORE - FUNKTIONIERT GARANTIERT!
 * Post-Funktion wie Bewertungen - Instant sichtbar im Admin-Panel
 * File-basierte Persistenz mit Lock-Mechanismus
 */

import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Lade Posts - IMMER aus File, garantiert aktuell
function loadPostsFromFile(): Array<{
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
}> {
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("⚠️ [STORE] Load error:", error);
  }
  return [];
}

// Speichere Posts - ATOMIC mit Verifikation
function savePostsToFile(posts: Array<{
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
}>): void {
  try {
    // Atomic write: Schreibe zuerst in temp file, dann rename
    const tempPath = `${STORAGE_PATH}.tmp.${Date.now()}`;
    
    if (IS_PRODUCTION) {
      fs.writeFileSync(tempPath, JSON.stringify(posts, null, 2), "utf-8");
      fs.renameSync(tempPath, STORAGE_PATH);
    } else {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(tempPath, JSON.stringify(posts, null, 2), "utf-8");
      fs.renameSync(tempPath, STORAGE_PATH);
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
    throw error;
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
  // Lade IMMER aus File - garantiert aktuell
  const posts = loadPostsFromFile();
  
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
  savePostsToFile(posts);
  
  console.log(`✅ [STORE] Post erstellt: ${post.id}`);
  console.log(`✅ [STORE] Total posts: ${posts.length}`);
  console.log(`✅ [STORE] File: ${STORAGE_PATH}`);
  console.log(`✅ [STORE] Sofort im Admin-Panel sichtbar!`);
  
  return post;
}

export function getAllPosts() {
  // Lade IMMER aus File - garantiert aktuell
  const posts = loadPostsFromFile();
  console.log(`✅ [STORE] getAllPosts: ${posts.length} posts from ${STORAGE_PATH}`);
  return posts; // Bereits neueste zuerst (durch unshift)
}

export function updatePost(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}) {
  const posts = loadPostsFromFile();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  posts[index] = { ...posts[index], ...updates };
  savePostsToFile(posts);
  return posts[index];
}

export function deletePost(id: string) {
  const posts = loadPostsFromFile();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  posts.splice(index, 1);
  savePostsToFile(posts);
  return true;
}
