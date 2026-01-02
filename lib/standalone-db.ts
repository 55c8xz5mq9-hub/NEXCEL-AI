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
      
      // Teste die Verbindung
      try {
        await kv.ping();
        console.log("✅ [STANDALONE DB] Vercel KV initialized and connected");
        return kv;
      } catch (pingError) {
        console.warn("⚠️ [STANDALONE DB] Vercel KV ping failed, using JSON fallback:", pingError);
        kv = null;
        return null;
      }
    } catch (error) {
      console.warn("⚠️ [STANDALONE DB] Vercel KV not available, using JSON fallback:", error);
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
      console.log("✅ [STANDALONE DB] Created data directory:", DATA_DIR);
    }
    
    // Prüfe Schreibrechte (nur lokal, nicht in Serverless)
    if (!IS_SERVERLESS) {
      try {
        fs.accessSync(DATA_DIR, fs.constants.W_OK);
      } catch (accessError) {
        console.error("❌ [STANDALONE DB] Data directory not writable:", DATA_DIR);
        throw new Error(`Data directory is not writable: ${accessError instanceof Error ? accessError.message : String(accessError)}`);
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [STANDALONE DB] Failed to ensure data directory:", errorMessage);
    throw new Error(`Cannot access data directory: ${errorMessage}`);
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

  // Fallback: JSON-Datei (lokal) oder /tmp (Serverless)
  try {
    // In Serverless: /tmp ist immer verfügbar
    if (IS_SERVERLESS) {
      // Stelle sicher, dass /tmp/data existiert
      if (!fs.existsSync("/tmp/data")) {
        try {
          fs.mkdirSync("/tmp/data", { recursive: true });
          console.log("✅ [STANDALONE DB] Created /tmp/data directory");
        } catch (e) {
          console.warn("⚠️ [STANDALONE DB] Could not create /tmp/data:", e);
        }
      }
    } else {
      // Lokal: Stelle sicher, dass Verzeichnis existiert
      try {
        ensureDataDir();
      } catch (dirError) {
        console.warn("⚠️ [STANDALONE DB] ensureDataDir failed, trying anyway:", dirError);
      }
    }
    
    // Lade bestehende Kontakte
    const contacts = await getAllContacts();
    contacts.push(newContact);
    
    const filePath = path.join(DATA_DIR, "contacts.json");
    
    // Mehrere Versuche mit Retry
    let writeSuccess = false;
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const tempPath = `${filePath}.tmp.${Date.now()}`;
        const jsonData = JSON.stringify(contacts, null, 2);
        
        // Schreibe zuerst in temp-Datei
        fs.writeFileSync(tempPath, jsonData, "utf-8");
        
        // Prüfe ob temp-Datei existiert
        if (!fs.existsSync(tempPath)) {
          throw new Error("Temp file was not created");
        }
        
        // Rename (atomic)
        fs.renameSync(tempPath, filePath);
        
        // Prüfe ob finale Datei existiert
        if (!fs.existsSync(filePath)) {
          throw new Error("Final file was not created");
        }
        
        writeSuccess = true;
        console.log(`✅ [STANDALONE DB] Contact saved to JSON (attempt ${attempt}):`, newContact.id);
        console.log(`✅ [STANDALONE DB] File path: ${filePath}`);
        break;
      } catch (writeError: unknown) {
        lastError = writeError instanceof Error ? writeError : new Error(String(writeError));
        console.warn(`⚠️ [STANDALONE DB] Write attempt ${attempt} failed:`, lastError.message);
        console.warn(`⚠️ [STANDALONE DB] File path: ${filePath}, IS_SERVERLESS: ${IS_SERVERLESS}`);
        
        if (attempt < 3) {
          // Warte kurz und versuche Verzeichnis neu zu erstellen
          await new Promise(resolve => setTimeout(resolve, 100));
          try {
            if (IS_SERVERLESS) {
              fs.mkdirSync("/tmp/data", { recursive: true });
            } else {
              ensureDataDir();
            }
          } catch (e) {
            // Ignoriere
          }
        }
      }
    }
    
    if (!writeSuccess) {
      const errorMsg = lastError?.message || "Unknown error";
      console.error("❌ [STANDALONE DB] All write attempts failed:", errorMsg);
      console.error("❌ [STANDALONE DB] Environment:", {
        IS_SERVERLESS,
        DATA_DIR,
        filePath,
        cwd: process.cwd(),
      });
      throw new Error(`Speichern fehlgeschlagen: ${errorMsg}`);
    }
    
    return newContact;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [STANDALONE DB] CRITICAL Error saving contact:", errorMessage);
    console.error("  Contact data:", JSON.stringify(contact, null, 2));
    console.error("  DATA_DIR:", DATA_DIR);
    console.error("  IS_SERVERLESS:", IS_SERVERLESS);
    console.error("  process.cwd():", process.cwd());
    throw new Error(`Kontakt konnte nicht gespeichert werden: ${errorMessage}`);
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

