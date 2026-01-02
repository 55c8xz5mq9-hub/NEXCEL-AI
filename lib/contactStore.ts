/**
 * Contact Store - Einfache JSON-Datei-basierte Datenbank
 * Funktioniert komplett unabhängig von Mail/Resend/Prisma
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

/**
 * Stellt sicher, dass das Datenverzeichnis existiert
 */
async function ensureDataDir(): Promise<void> {
  const dir = path.dirname(STORAGE_FILE);
  if (!fs.existsSync(dir)) {
    await fsPromises.mkdir(dir, { recursive: true });
  }
}

/**
 * Lädt alle Kontaktanfragen aus der JSON-Datei
 */
export async function getAllContactRequests(): Promise<ContactRequest[]> {
  try {
    await ensureDataDir();
    
    if (!fs.existsSync(STORAGE_FILE)) {
      // Erstelle leere Datei mit []
      await fsPromises.writeFile(STORAGE_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }

    const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
    const contacts = JSON.parse(data);

    if (!Array.isArray(contacts)) {
      console.warn("⚠️ [CONTACT STORE] Invalid data format, resetting to empty array");
      await fsPromises.writeFile(STORAGE_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }

    return contacts as ContactRequest[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT STORE] Error loading contacts:", errorMessage);
    return [];
  }
}

/**
 * Speichert eine neue Kontaktanfrage
 */
export async function saveContactRequest(
  contact: Omit<ContactRequest, "id" | "createdAt" | "status">
): Promise<ContactRequest> {
  try {
    await ensureDataDir();

    const contacts = await getAllContactRequests();

    const newContact: ContactRequest = {
      ...contact,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      status: "open",
    };

    contacts.push(newContact);

    // Atomic write
    const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
    await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
    await fsPromises.rename(tempFile, STORAGE_FILE);

    console.log("✅ [CONTACT STORE] Contact request saved:", newContact.id);
    return newContact;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT STORE] Error saving contact:", errorMessage);
    throw new Error(`Fehler beim Speichern: ${errorMessage}`);
  }
}

/**
 * Aktualisiert eine Kontaktanfrage (z.B. Status ändern)
 */
export async function updateContactRequest(
  id: string,
  updates: Partial<ContactRequest>
): Promise<ContactRequest | null> {
  try {
    await ensureDataDir();

    const contacts = await getAllContactRequests();
    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...updates };

    // Atomic write
    const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
    await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
    await fsPromises.rename(tempFile, STORAGE_FILE);

    console.log("✅ [CONTACT STORE] Contact request updated:", id);
    return contacts[index];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT STORE] Error updating contact:", errorMessage);
    return null;
  }
}

/**
 * Löscht eine Kontaktanfrage
 */
export async function deleteContactRequest(id: string): Promise<boolean> {
  try {
    await ensureDataDir();

    const contacts = await getAllContactRequests();
    const filtered = contacts.filter((c) => c.id !== id);

    if (filtered.length === contacts.length) {
      return false; // Contact not found
    }

    // Atomic write
    const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
    await fsPromises.writeFile(tempFile, JSON.stringify(filtered, null, 2), "utf-8");
    await fsPromises.rename(tempFile, STORAGE_FILE);

    console.log("✅ [CONTACT STORE] Contact request deleted:", id);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT STORE] Error deleting contact:", errorMessage);
    return false;
  }
}

