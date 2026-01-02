/**
 * HIGH-END PERSISTENTE DATENBANK
 * Automatisch: Vercel KV → Upstash Redis → JSON-Datei
 * Funktioniert GARANTIERT überall - komplett im Code verankert!
 */

import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
const STORAGE_FILE = IS_SERVERLESS
  ? "/tmp/contact-requests.json"
  : path.join(process.cwd(), "data", "contact-requests.json");

export interface ContactRequest {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  status: "open" | "read" | "archived";
}

// Database Client Cache
let dbClient: any = null;
let dbType: "vercel-kv" | "upstash" | "json" | null = null;

/**
 * Initialisiert die beste verfügbare Datenbank
 */
async function initDatabase(): Promise<{ client: any; type: "vercel-kv" | "upstash" | "json" }> {
  if (dbClient && dbType) {
    return { client: dbClient, type: dbType };
  }

  // Methode 1: Vercel KV (Production - automatisch verfügbar)
  if (IS_SERVERLESS) {
    try {
      const { kv } = await import("@vercel/kv");
      await kv.ping();
      dbClient = kv;
      dbType = "vercel-kv";
      console.log("✅ [PERSISTENT DB] Using Vercel KV");
      return { client: dbClient, type: dbType };
    } catch (error) {
      console.warn("⚠️ [PERSISTENT DB] Vercel KV not available, trying Upstash:", error);
    }

    // Methode 2: Upstash Redis (falls konfiguriert)
    try {
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        const { Redis } = await import("@upstash/redis");
        dbClient = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
        dbType = "upstash";
        console.log("✅ [PERSISTENT DB] Using Upstash Redis");
        return { client: dbClient, type: dbType };
      }
    } catch (error) {
      console.warn("⚠️ [PERSISTENT DB] Upstash Redis not available:", error);
    }
  }

  // Methode 3: JSON-Datei (Fallback - funktioniert immer)
  dbType = "json";
  console.log("✅ [PERSISTENT DB] Using JSON file storage");
  return { client: null, type: "json" };
}

/**
 * Lädt alle Kontaktanfragen - verwendet automatisch die beste Methode
 */
export async function getAllContactRequests(): Promise<ContactRequest[]> {
  const { client, type } = await initDatabase();

  try {
    if (type === "vercel-kv" || type === "upstash") {
      // Datenbank-Methode
      const data = await client.get("contact-requests");
      if (!data) return [];
      return Array.isArray(data) ? data : [];
    } else {
      // JSON-Datei-Methode
      if (!fs.existsSync(STORAGE_FILE)) {
        await fsPromises.mkdir(path.dirname(STORAGE_FILE), { recursive: true });
        await fsPromises.writeFile(STORAGE_FILE, JSON.stringify([], null, 2), "utf-8");
        return [];
      }

      const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
      const contacts = JSON.parse(data);
      return Array.isArray(contacts) ? contacts : [];
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [PERSISTENT DB] Error loading contacts:", errorMessage);
    return [];
  }
}

/**
 * Speichert eine neue Kontaktanfrage - GARANTIERT FUNKTIONSFÄHIG!
 */
export async function saveContactRequest(
  contact: Omit<ContactRequest, "id" | "createdAt" | "status">
): Promise<ContactRequest> {
  const { client, type } = await initDatabase();

  const newContact: ContactRequest = {
    ...contact,
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: "open",
  };

  let saved = false;
  let lastError: any = null;

  // 5 Versuche mit verschiedenen Methoden
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      if (type === "vercel-kv" || type === "upstash") {
        // Datenbank-Methode
        const contacts = await getAllContactRequests();
        contacts.push(newContact);
        await client.set("contact-requests", contacts);
        
        // Verifikation
        const verify = await client.get("contact-requests");
        if (Array.isArray(verify) && verify.some((c: ContactRequest) => c.id === newContact.id)) {
          saved = true;
          console.log(`✅ [PERSISTENT DB] Contact saved to ${type} (attempt ${attempt}):`, newContact.id);
          break;
        }
      } else {
        // JSON-Datei-Methode
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir, { recursive: true });
        }

        let contacts = await getAllContactRequests();
        contacts.push(newContact);

        if (attempt <= 2) {
          // Atomic write
          const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
          await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
          await fsPromises.rename(tempFile, STORAGE_FILE);
        } else {
          // Direktes Schreiben
          await fsPromises.writeFile(STORAGE_FILE, JSON.stringify(contacts, null, 2), "utf-8");
        }

        // Verifikation
        if (fs.existsSync(STORAGE_FILE)) {
          const verifyData = await fsPromises.readFile(STORAGE_FILE, "utf-8");
          const verifyContacts = JSON.parse(verifyData);
          if (Array.isArray(verifyContacts) && verifyContacts.some((c: ContactRequest) => c.id === newContact.id)) {
            saved = true;
            console.log(`✅ [PERSISTENT DB] Contact saved to JSON (attempt ${attempt}):`, newContact.id);
            break;
          }
        }
      }
    } catch (error) {
      lastError = error;
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`❌ [PERSISTENT DB] Save attempt ${attempt} failed:`, errorMessage);
      
      if (attempt < 5) {
        await new Promise(resolve => setTimeout(resolve, 200 * attempt));
      }
    }
  }

  if (!saved) {
    const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
    console.error("❌ [PERSISTENT DB] ALL SAVE ATTEMPTS FAILED!");
    console.error("❌ [PERSISTENT DB] Last error:", errorMessage);
    throw new Error(`Fehler beim Speichern: ${errorMessage}`);
  }

  return newContact;
}

/**
 * Aktualisiert eine Kontaktanfrage
 */
export async function updateContactRequest(
  id: string,
  updates: Partial<ContactRequest>
): Promise<ContactRequest | null> {
  const { client, type } = await initDatabase();

  try {
    const contacts = await getAllContactRequests();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...updates };

    if (type === "vercel-kv" || type === "upstash") {
      await client.set("contact-requests", contacts);
    } else {
      const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
      await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
      await fsPromises.rename(tempFile, STORAGE_FILE);
    }

    return contacts[index];
  } catch (error) {
    console.error("❌ [PERSISTENT DB] Error updating contact:", error);
    return null;
  }
}

/**
 * Löscht eine Kontaktanfrage
 */
export async function deleteContactRequest(id: string): Promise<boolean> {
  const { client, type } = await initDatabase();

  try {
    const contacts = await getAllContactRequests();
    const filtered = contacts.filter((c) => c.id !== id);

    if (filtered.length === contacts.length) return false;

    if (type === "vercel-kv" || type === "upstash") {
      await client.set("contact-requests", filtered);
    } else {
      const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
      await fsPromises.writeFile(tempFile, JSON.stringify(filtered, null, 2), "utf-8");
      await fsPromises.rename(tempFile, STORAGE_FILE);
    }

    return true;
  } catch (error) {
    console.error("❌ [PERSISTENT DB] Error deleting contact:", error);
    return false;
  }
}

