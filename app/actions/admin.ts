"use server";

import { verifySession } from "@/lib/auth";
import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Lade Posts aus File - GLEICHE FUNKTION wie in contact.ts!
function loadPosts() {
  try {
    // Prüfe globalen Store zuerst
    if (globalThis.__contactPosts) {
      return globalThis.__contactPosts;
    }
    
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        globalThis.__contactPosts = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn("⚠️ [ADMIN] Load error:", error);
  }
  
  return [];
}

// POSTS laden - Instant sichtbar!
export async function getAdminContacts() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized", contacts: [] };
    }

    // Lade Posts - GLEICHE FUNKTION wie in contact.ts!
    const posts = loadPosts();
    
    console.log(`✅ [ADMIN] Loaded ${posts.length} posts`);
    console.log(`✅ [ADMIN] First post ID: ${posts[0]?.id || "none"}`);
    
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

    console.log(`✅ [ADMIN] Loaded ${transformedContacts.length} posts`);
    return { contacts: transformedContacts };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to fetch posts", contacts: [] };
  }
}

// Post als gelesen markieren
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
    
    // Speichere
    try {
      globalThis.__contactPosts = posts;
      if (IS_PRODUCTION) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      } else {
        const dir = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      }
    } catch (error) {
      console.error("❌ [ADMIN] Save error:", error);
    }
    
    return { success: true, contact: posts[index] };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to update post" };
  }
}

// Post archivieren
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
    
    // Speichere
    try {
      globalThis.__contactPosts = posts;
      if (IS_PRODUCTION) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      } else {
        const dir = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      }
    } catch (error) {
      console.error("❌ [ADMIN] Save error:", error);
    }
    
    return { success: true, contact: posts[index] };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to archive post" };
  }
}

// Post löschen
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
    
    // Speichere
    try {
      globalThis.__contactPosts = posts;
      if (IS_PRODUCTION) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      } else {
        const dir = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      }
    } catch (error) {
      console.error("❌ [ADMIN] Save error:", error);
    }
    
    return { success: true };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to delete post" };
  }
}
