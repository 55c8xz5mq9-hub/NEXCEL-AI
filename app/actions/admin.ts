"use server";

import { verifySession } from "@/lib/auth";
import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

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

// Lade Posts - IMMER aus File!
function loadPosts() {
  try {
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      if (data && data.trim()) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          globalThis.__contactPosts = parsed;
          console.log(`✅ [ADMIN] Loaded ${parsed.length} posts from file: ${STORAGE_PATH}`);
          return parsed;
        } else {
          console.warn("⚠️ [ADMIN] File data is not an array");
        }
      } else {
        console.warn("⚠️ [ADMIN] File is empty");
      }
    } else {
      console.log(`ℹ️ [ADMIN] File does not exist yet: ${STORAGE_PATH}`);
    }
  } catch (error: any) {
    console.error("❌ [ADMIN] Error loading posts:", error?.message || error);
  }
  
  // Fallback: Memory
  if (globalThis.__contactPosts && Array.isArray(globalThis.__contactPosts)) {
    console.log(`✅ [ADMIN] Using ${globalThis.__contactPosts.length} posts from memory (fallback)`);
    return globalThis.__contactPosts;
  }
  
  console.log("ℹ️ [ADMIN] Returning empty array");
  return [];
}

// Speichere Posts
function savePosts(posts: Array<any>): void {
  if (!Array.isArray(posts)) return;
  
  globalThis.__contactPosts = posts;
  
  for (let attempt = 1; attempt <= 10; attempt++) {
    try {
      if (IS_PRODUCTION) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      } else {
        const dir = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      }
      
      if (fs.existsSync(STORAGE_PATH)) {
        const verify = fs.readFileSync(STORAGE_PATH, "utf-8");
        const verifyParsed = JSON.parse(verify);
        if (Array.isArray(verifyParsed) && verifyParsed.length === posts.length) {
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
}

export async function getAdminContacts() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/actions/admin.ts:99',message:'getAdminContacts entry',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
  // #endregion
  try {
    const session = await verifySession();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/actions/admin.ts:102',message:'Session check',data:{hasSession:!!session,role:session?.role},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H'})}).catch(()=>{});
    // #endregion
    if (!session || session.role !== "admin") {
      console.log("❌ [ADMIN] Unauthorized access");
      return { error: "Unauthorized", contacts: [] };
    }

    console.log("✅ [ADMIN] Loading posts...");
    const posts = loadPosts();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/actions/admin.ts:109',message:'Posts loaded',data:{count:posts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'I'})}).catch(()=>{});
    // #endregion
    console.log(`✅ [ADMIN] Loaded ${posts.length} posts from file`);
    
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

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/actions/admin.ts:125',message:'Returning contacts',data:{count:transformedContacts.length},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'J'})}).catch(()=>{});
    // #endregion
    console.log(`✅ [ADMIN] Returning ${transformedContacts.length} contacts`);
    return { contacts: transformedContacts };
  } catch (error: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/actions/admin.ts:128',message:'Error in getAdminContacts',data:{error:error?.message||String(error),stack:error?.stack},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'K'})}).catch(()=>{});
    // #endregion
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
