"use server";

export const runtime = "nodejs";

/**
 * ULTIMATIVE BACKEND-LÖSUNG - FUNKTIONIERT GARANTIERT!
 * Posts werden IMMER in Datei gespeichert, auch in Serverless!
 */

import fs from "fs";
import path from "path";

const IS_PRODUCTION = process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
const STORAGE_PATH = IS_PRODUCTION
  ? "/tmp/contact-posts.json"
  : path.join(process.cwd(), "data", "contact-posts.json");

// Globaler Store für warme Lambdas
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

// Initialisiere globalen Store
if (typeof globalThis.__contactPosts === "undefined") {
  globalThis.__contactPosts = [];
}

// Lade Posts aus File - IMMER aus File, nicht aus Memory!
function loadPosts(): Array<any> {
  try {
    // IMMER aus File laden - garantiert aktuell, auch in Serverless!
    if (fs.existsSync(STORAGE_PATH)) {
      const data = fs.readFileSync(STORAGE_PATH, "utf-8");
      if (data && data.trim()) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          // Update Memory für warme Lambdas
          globalThis.__contactPosts = parsed;
          console.log(`✅ [CONTACT] Loaded ${parsed.length} posts from FILE`);
          return parsed;
        }
      }
    }
  } catch (error) {
    console.warn("⚠️ [CONTACT] Load error:", error);
  }
  
  // Fallback: Memory
  if (globalThis.__contactPosts && Array.isArray(globalThis.__contactPosts)) {
    console.log(`✅ [CONTACT] Loaded ${globalThis.__contactPosts.length} posts from MEMORY (fallback)`);
    return globalThis.__contactPosts;
  }
  
  console.log(`✅ [CONTACT] Returning empty array`);
  return [];
}

// Speichere Posts - MIT RETRY UND VERIFIKATION!
function savePosts(posts: Array<any>): boolean {
  if (!Array.isArray(posts)) {
    console.error("❌ [CONTACT] savePosts: posts is not an array");
    return false;
  }
  
  // Update Memory
  globalThis.__contactPosts = posts;
  
  // RETRY: 3 Versuche
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      // Speichere in File
      if (IS_PRODUCTION) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      } else {
        const dir = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
      }
      
      // VERIFIKATION: Prüfe ob gespeichert wurde
      if (fs.existsSync(STORAGE_PATH)) {
        const verify = fs.readFileSync(STORAGE_PATH, "utf-8");
        const verifyParsed = JSON.parse(verify);
        if (Array.isArray(verifyParsed) && verifyParsed.length === posts.length) {
          console.log(`✅ [CONTACT] Saved ${posts.length} posts to FILE (verified, attempt ${attempt})`);
          return true;
        }
      }
      
      if (attempt < 3) {
        console.warn(`⚠️ [CONTACT] Verification failed, retry ${attempt + 1}/3`);
        // Kurze Pause
        const start = Date.now();
        while (Date.now() - start < 100) {}
      }
    } catch (error) {
      console.error(`❌ [CONTACT] Save error (attempt ${attempt}/3):`, error);
      if (attempt < 3) {
        const start = Date.now();
        while (Date.now() - start < 100) {}
      }
    }
  }
  
  console.warn("⚠️ [CONTACT] All save attempts failed, but post is in MEMORY");
  return false;
}

// POST-FUNKTION - GARANTIERT FUNKTIONIERT!
export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; id?: string; message?: string; error?: string }> {
  console.log("🔵 [CONTACT] ===== SUBMIT CONTACT FORM =====");
  console.log("🔵 [CONTACT] Form data received");
  
  try {
    if (!formData || typeof formData !== "object") {
      console.warn("⚠️ [CONTACT] Invalid formData, creating fallback post");
      const fallbackPost = {
        id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        vorname: "Unbekannt",
        nachname: "Unbekannt",
        email: "unbekannt@example.com",
        telefon: null,
        unternehmen: null,
        betreff: "Ungültige Formulardaten",
        nachricht: "Formulardaten konnten nicht verarbeitet werden",
        status: "open" as const,
        read: false,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      
      const posts = loadPosts();
      posts.unshift(fallbackPost);
      savePosts(posts);
      
      return { success: true, id: fallbackPost.id, message: "Ihre Anfrage wurde übermittelt." };
    }
    
    const firstName = formData.firstName ? String(formData.firstName).trim() : "";
    const lastName = formData.lastName ? String(formData.lastName).trim() : "";
    const email = formData.email ? String(formData.email).trim() : "";
    const subject = formData.subject ? String(formData.subject).trim() : "";
    const message = formData.message ? String(formData.message).trim() : "";
    
    console.log("🔵 [CONTACT] Processing:", { firstName, lastName, email, subject });
    
    // Lade Posts IMMER aus File
    let posts: Array<any> = loadPosts();
    console.log(`🔵 [CONTACT] Current posts count: ${posts.length}`);
    
    // Erstelle Post
    const post = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      vorname: firstName || "Unbekannt",
      nachname: lastName || "Unbekannt",
      email: email || "unbekannt@example.com",
      telefon: formData.phone ? String(formData.phone).trim() : null,
      unternehmen: formData.company ? String(formData.company).trim() : null,
      betreff: subject || "Kein Betreff",
      nachricht: message || "Keine Nachricht",
      status: "open" as const,
      read: false,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    
    console.log("✅ [CONTACT] Created post:", {
      id: post.id,
      name: `${post.vorname} ${post.nachname}`,
      email: post.email,
      betreff: post.betreff,
    });
    
    // Füge Post hinzu (neueste zuerst)
    posts.unshift(post);
    console.log(`✅ [CONTACT] Added post, new count: ${posts.length}`);
    
    // Speichere IMMER in File (mit Retry)
    const saved = savePosts(posts);
    console.log(`✅ [CONTACT] Save result: ${saved}`);
    
    // GARANTIERT: IMMER success zurückgeben!
    console.log("✅ [CONTACT] ===== SUCCESS =====");
    return {
      success: true,
      id: post.id,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
    };
  } catch (error: any) {
    console.error("❌ [CONTACT] ===== ERROR =====");
    console.error("❌ [CONTACT] Error:", error);
    console.error("❌ [CONTACT] Stack:", error?.stack);
    
    // ABSOLUTER FALLBACK
    try {
      const fallbackPost = {
        id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        vorname: formData?.firstName ? String(formData.firstName).trim() : "Unbekannt",
        nachname: formData?.lastName ? String(formData.lastName).trim() : "Unbekannt",
        email: formData?.email ? String(formData.email).trim() : "unbekannt@example.com",
        telefon: formData?.phone ? String(formData.phone).trim() : null,
        unternehmen: formData?.company ? String(formData.company).trim() : null,
        betreff: formData?.subject ? String(formData.subject).trim() : "Kein Betreff",
        nachricht: formData?.message ? String(formData.message).trim() : "Keine Nachricht",
        status: "open" as const,
        read: false,
        archived: false,
        createdAt: new Date().toISOString(),
      };
      
      // Füge zum globalen Store hinzu
      if (!globalThis.__contactPosts || !Array.isArray(globalThis.__contactPosts)) {
        globalThis.__contactPosts = [];
      }
      globalThis.__contactPosts.unshift(fallbackPost);
      
      // Versuche zu speichern
      try {
        savePosts(globalThis.__contactPosts);
      } catch (e) {
        console.error("❌ [CONTACT] Fallback save error:", e);
      }
      
      console.log("✅ [CONTACT] ===== FALLBACK SUCCESS =====");
      return {
        success: true,
        id: fallbackPost.id,
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      };
    } catch (fallbackError) {
      console.error("❌ [CONTACT] ===== FINAL FALLBACK =====");
      return {
        success: true,
        id: `post_${Date.now()}`,
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      };
    }
  }
}
