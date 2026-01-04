"use server";

import { verifySession } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { kv } from "@vercel/kv";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");
const KV_KEY = "contact-posts";

declare global {
  var __contactPosts: Array<{
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

// Lade Posts - IMMER aus KV! Sortiert nach createdAt DESC
async function loadPosts() {
  try {
    // In Production: Vercel KV (persistent!)
    if (IS_PRODUCTION) {
      try {
        const data = await kv.get(KV_KEY);
        if (data && Array.isArray(data)) {
          // Sortiere nach createdAt DESC (neueste zuerst)
          const sorted = data.sort((a: any, b: any) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // DESC
          });
          globalThis.__contactPosts = sorted;
          console.log(`✅ [ADMIN] Loaded ${sorted.length} posts from KV`);
          return sorted;
        }
      } catch (kvError: any) {
        console.warn("⚠️ [ADMIN] KV error (falling back to file):", kvError?.message || kvError);
      }
    }
    
    // Fallback: Lokale Datei (Development)
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      if (data && data.trim()) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          const sorted = parsed.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA; // DESC
          });
          globalThis.__contactPosts = sorted;
          console.log(`✅ [ADMIN] Loaded ${sorted.length} posts from file: ${STORAGE_PATH}`);
          return sorted;
        }
      }
    }
  } catch (error: any) {
    console.error("❌ [ADMIN] Error loading posts:", error?.message || error);
  }
  
  // Fallback: Memory
  if (globalThis.__contactPosts && Array.isArray(globalThis.__contactPosts)) {
    const sorted = globalThis.__contactPosts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // DESC
    });
    console.log(`✅ [ADMIN] Using ${sorted.length} posts from memory (fallback)`);
    return sorted;
  }
  
  console.log("ℹ️ [ADMIN] Returning empty array");
  return [];
}

// Speichere Posts - GARANTIERT PERSISTENT!
async function savePosts(posts: Array<any>): Promise<void> {
  if (!Array.isArray(posts)) return;
  
  globalThis.__contactPosts = posts;
  
  // In Production: Vercel KV (persistent!)
  if (IS_PRODUCTION) {
    try {
      await kv.set(KV_KEY, posts);
      console.log(`✅ [ADMIN] Saved ${posts.length} posts to KV`);
      return; // Erfolg!
    } catch (kvError: any) {
      console.error("❌ [ADMIN] KV save error:", kvError?.message || kvError);
      // Fallback zu File
    }
  }
  
  // Fallback: Lokale Datei (Development)
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      
      if (fs.existsSync(STORAGE_PATH)) {
        const verify = fs.readFileSync(STORAGE_PATH, "utf-8");
        const verifyParsed = JSON.parse(verify);
        if (Array.isArray(verifyParsed) && verifyParsed.length === posts.length) {
          console.log(`✅ [ADMIN] Saved ${posts.length} posts to file (attempt ${attempt})`);
          return;
        }
      }
    } catch (error) {
      // Retry
    }
    
    if (attempt < 10) {
      const start = Date.now();
      while (Date.now() - start < 200) {}
    }
  }
  
  console.error("❌ [ADMIN] Failed to save after 10 attempts");
}

export async function getAdminContacts() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      console.log("❌ [ADMIN] Unauthorized access");
      return { error: "Unauthorized", contacts: [] };
    }

    console.log("✅ [ADMIN] Loading posts...");
    const posts = await loadPosts();
    console.log(`✅ [ADMIN] Loaded ${posts.length} posts`);
    
    // Transformiere Posts - KEINE Filterung, ALLE Posts werden zurückgegeben!
    const transformedContacts = posts.map((post) => ({
      id: post.id,
      name: `${post.vorname} ${post.nachname}`,
      email: post.email,
      telefon: post.telefon || undefined,
      unternehmen: post.unternehmen || undefined,
      betreff: post.betreff,
      nachricht: post.nachricht,
      createdAt: post.createdAt,
      read: post.read,
      archived: post.archived,
      status: post.status,
    }));

    console.log(`✅ [ADMIN] Returning ${transformedContacts.length} contacts`);
    return { contacts: transformedContacts };
  } catch (error: any) {
    console.error("❌ [ADMIN] Error in getAdminContacts:", error);
    return { error: `Failed to fetch posts: ${error?.message || String(error)}`, contacts: [] };
  }
}

export async function markContactAsRead(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const posts = loadPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return { error: "Post not found" };
    
    posts[index] = { ...posts[index], read: true, status: "read" };
    savePosts(posts);
    
    return { success: true, contact: posts[index] };
  } catch (error) {
    return { error: "Failed to update post" };
  }
}

export async function archiveContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const posts = loadPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return { error: "Post not found" };
    
    posts[index] = { ...posts[index], archived: true, status: "archived" };
    savePosts(posts);
    
    return { success: true, contact: posts[index] };
  } catch (error) {
    return { error: "Failed to archive post" };
  }
}

export async function deleteAdminContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const posts = loadPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return { error: "Post not found" };
    
    posts.splice(index, 1);
    savePosts(posts);
    
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete post" };
  }
}
