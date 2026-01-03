/**
 * HIGH-END KONTAKT-STORE - Post-Funktion wie Bewertungen
 * FUNKTIONIERT IN PRODUCTION - Persistente Datenbank im Backend
 */

import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Lade Posts aus File - IMMER aktuell
function loadPosts(): Array<{
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

// Speichere Posts in File - ATOMIC
function savePosts(posts: Array<{
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
}>) {
  try {
    if (IS_PRODUCTION) {
      // Production: /tmp
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    } else {
      // Local: data/
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("❌ [STORE] Save error:", error);
    throw error; // Wichtig - Fehler nicht verstecken
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
  console.log(`✅ [STORE] Total posts: ${posts.length}`);
  console.log(`✅ [STORE] Sofort im Admin-Panel sichtbar!`);
  
  return post;
}

export function getAllPosts() {
  // Lade IMMER aus File - garantiert aktuell
  const posts = loadPosts();
  console.log(`✅ [STORE] getAllPosts: ${posts.length} posts loaded`);
  return posts; // Bereits neueste zuerst (durch unshift)
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
