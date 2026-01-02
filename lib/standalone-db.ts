/**
 * STANDALONE Datenbank-Lösung - Keine Abhängigkeiten!
 * Funktioniert überall: Lokal, Production, Serverless
 */

import fs from "fs";
import path from "path";

const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;
const DATA_DIR = IS_SERVERLESS 
  ? "/tmp/data" 
  : path.join(process.cwd(), "data");

// Vercel KV Client (lazy load)
let kv: any = null;

/**
 * Initialisiert Vercel KV (nur in Production auf Vercel)
 */
async function getKVClient() {
  if (!IS_SERVERLESS) {
    return null; // Nicht auf Vercel, verwende JSON
  }

  if (!kv) {
    try {
      // @ts-ignore - Vercel KV ist automatisch verfügbar wenn installiert
      const { kv: vercelKV } = await import("@vercel/kv");
      kv = vercelKV;
      console.log("✅ [STANDALONE DB] Vercel KV initialized");
      return kv;
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV not available, using JSON fallback");
      return null;
    }
  }

  return kv;
}

/**
 * Stellt sicher, dass Datenverzeichnis existiert
 */
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!IS_SERVERLESS) {
      fs.accessSync(DATA_DIR, fs.constants.W_OK);
    }
  } catch (error) {
    console.error("❌ [STANDALONE DB] Failed to ensure data directory:", error);
  }
}

/**
 * Lädt alle Kontakte - funktioniert überall
 */
export async function getAllContacts(): Promise<any[]> {
  // Versuche zuerst Vercel KV (Production)
  if (IS_SERVERLESS) {
    try {
      const kvClient = await getKVClient();
      if (kvClient) {
        const contacts = await kvClient.get("contacts") || [];
        console.log(`✅ [STANDALONE DB] Loaded ${contacts.length} contacts from Vercel KV`);
        return Array.isArray(contacts) ? contacts : [];
      }
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV failed, using JSON:", error);
    }
  }

  // Fallback: JSON-Datei (lokal oder wenn KV nicht verfügbar)
  try {
    ensureDataDir();
    const filePath = path.join(DATA_DIR, "contacts.json");
    
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const contacts = JSON.parse(data);
    
    return Array.isArray(contacts) 
      ? contacts.sort((a: any, b: any) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        )
      : [];
  } catch (error) {
    console.error("❌ [STANDALONE DB] Error reading contacts:", error);
    return [];
  }
}

/**
 * Speichert einen Kontakt - funktioniert überall
 */
export async function saveContactStandalone(contact: {
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  unternehmen: string;
  betreff: string;
  nachricht: string;
}): Promise<any> {
  const newContact = {
    ...contact,
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
    emailSent: false,
    emailVerified: false,
  };

  // Versuche zuerst Vercel KV (Production)
  if (IS_SERVERLESS) {
    try {
      const kvClient = await getKVClient();
      if (kvClient) {
        const contacts = await getAllContacts();
        contacts.push(newContact);
        await kvClient.set("contacts", contacts);
        console.log("✅ [STANDALONE DB] Contact saved to Vercel KV:", newContact.id);
        return newContact;
      }
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV failed, using JSON:", error);
    }
  }

  // Fallback: JSON-Datei
  try {
    const contacts = await getAllContacts();
    contacts.push(newContact);
    
    ensureDataDir();
    const filePath = path.join(DATA_DIR, "contacts.json");
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    
    fs.writeFileSync(tempPath, JSON.stringify(contacts, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
    
    console.log("✅ [STANDALONE DB] Contact saved to JSON:", newContact.id);
    return newContact;
  } catch (error) {
    console.error("❌ [STANDALONE DB] Error saving contact:", error);
    throw new Error(`Failed to save contact: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Aktualisiert einen Kontakt
 */
export async function updateContactStandalone(
  id: string,
  updates: Partial<{ read: boolean; archived: boolean }>
): Promise<any | null> {
  // Versuche zuerst Vercel KV
  if (IS_SERVERLESS) {
    try {
      const kvClient = await getKVClient();
      if (kvClient) {
        const contacts = await getAllContacts();
        const index = contacts.findIndex((c: any) => c.id === id);
        if (index === -1) return null;
        
        contacts[index] = { ...contacts[index], ...updates };
        await kvClient.set("contacts", contacts);
        console.log("✅ [STANDALONE DB] Contact updated in Vercel KV:", id);
        return contacts[index];
      }
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV failed, using JSON:", error);
    }
  }

  // Fallback: JSON
  try {
    const contacts = await getAllContacts();
    const index = contacts.findIndex((c: any) => c.id === id);
    if (index === -1) return null;
    
    contacts[index] = { ...contacts[index], ...updates };
    
    ensureDataDir();
    const filePath = path.join(DATA_DIR, "contacts.json");
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    
    fs.writeFileSync(tempPath, JSON.stringify(contacts, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
    
    console.log("✅ [STANDALONE DB] Contact updated in JSON:", id);
    return contacts[index];
  } catch (error) {
    console.error("❌ [STANDALONE DB] Error updating contact:", error);
    return null;
  }
}

/**
 * Löscht einen Kontakt
 */
export async function deleteContactStandalone(id: string): Promise<boolean> {
  // Versuche zuerst Vercel KV
  if (IS_SERVERLESS) {
    try {
      const kvClient = await getKVClient();
      if (kvClient) {
        const contacts = await getAllContacts();
        const filtered = contacts.filter((c: any) => c.id !== id);
        if (filtered.length === contacts.length) return false;
        
        await kvClient.set("contacts", filtered);
        console.log("✅ [STANDALONE DB] Contact deleted from Vercel KV:", id);
        return true;
      }
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV failed, using JSON:", error);
    }
  }

  // Fallback: JSON
  try {
    const contacts = await getAllContacts();
    const filtered = contacts.filter((c: any) => c.id !== id);
    if (filtered.length === contacts.length) return false;
    
    ensureDataDir();
    const filePath = path.join(DATA_DIR, "contacts.json");
    const tempPath = `${filePath}.tmp.${Date.now()}`;
    
    fs.writeFileSync(tempPath, JSON.stringify(filtered, null, 2), "utf-8");
    fs.renameSync(tempPath, filePath);
    
    console.log("✅ [STANDALONE DB] Contact deleted from JSON:", id);
    return true;
  } catch (error) {
    console.error("❌ [STANDALONE DB] Error deleting contact:", error);
    return false;
  }
}

