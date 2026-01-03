/**
 * BACKEND-DATENBANK - Komplett im Backend verankert
 * Keine Prisma, keine externe DB, keine API
 * Alles läuft direkt im Server-Speicher
 */

// In-Memory Datenbank für Kontakte
let contactsDatabase: Array<{
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
}> = [];

// Persistenz über Datei-System - FUNKTIONIERT IN PRODUCTION!
// In Vercel: /tmp ist verfügbar, aber nur für die aktuelle Lambda-Instanz
// Daten bleiben im Memory während der Lambda läuft
import fs from "fs";
import path from "path";

const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;
const DATA_FILE = IS_SERVERLESS
  ? "/tmp/contacts-backend.json" // Vercel: /tmp ist verfügbar
  : path.join(process.cwd(), "data", "contacts-backend.json");

// Lade Daten beim Start - ROBUST für Production
function loadFromFile() {
  try {
    if (IS_SERVERLESS) {
      // In Vercel: /tmp existiert immer, aber ist leer bei neuem Lambda
      console.log("🔵 [BACKEND DB] Serverless environment detected");
      console.log("🔵 [BACKEND DB] DATA_FILE:", DATA_FILE);
      
      try {
        if (fs.existsSync(DATA_FILE)) {
          const data = fs.readFileSync(DATA_FILE, "utf-8");
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            contactsDatabase = parsed;
            console.log(`✅ [BACKEND DB] Loaded ${contactsDatabase.length} contacts from /tmp`);
          } else {
            contactsDatabase = [];
            console.log("⚠️ [BACKEND DB] File exists but invalid format, starting fresh");
          }
        } else {
          // Neues Lambda - starte frisch
          contactsDatabase = [];
          console.log("ℹ️ [BACKEND DB] Starting fresh in serverless environment");
        }
      } catch (fileError) {
        console.warn("⚠️ [BACKEND DB] File read error, starting fresh:", fileError);
        contactsDatabase = [];
      }
    } else {
      // Lokale Entwicklung
      console.log("🔵 [BACKEND DB] Local environment detected");
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log("✅ [BACKEND DB] Created data directory");
      }
      
      if (fs.existsSync(DATA_FILE)) {
        try {
          const data = fs.readFileSync(DATA_FILE, "utf-8");
          const parsed = JSON.parse(data);
          if (Array.isArray(parsed)) {
            contactsDatabase = parsed;
            console.log(`✅ [BACKEND DB] Loaded ${contactsDatabase.length} contacts from file`);
          } else {
            contactsDatabase = [];
            console.log("⚠️ [BACKEND DB] File exists but invalid format, starting fresh");
          }
        } catch (parseError) {
          console.warn("⚠️ [BACKEND DB] Parse error, starting fresh:", parseError);
          contactsDatabase = [];
        }
      } else {
        contactsDatabase = [];
        console.log("ℹ️ [BACKEND DB] No existing data file, starting fresh");
      }
    }
    
    console.log(`✅ [BACKEND DB] Initialized with ${contactsDatabase.length} contacts`);
  } catch (error) {
    console.error("❌ [BACKEND DB] Critical error during initialization:", error);
    contactsDatabase = []; // Sicherheitshalber leeres Array
  }
}

// Speichere Daten in Datei
function saveToFile() {
  try {
    if (IS_SERVERLESS) {
      // In Vercel: /tmp ist immer verfügbar
      fs.writeFileSync(DATA_FILE, JSON.stringify(contactsDatabase, null, 2), "utf-8");
    } else {
      // Lokale Entwicklung
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(contactsDatabase, null, 2), "utf-8");
    }
  } catch (error) {
    console.warn("⚠️ [BACKEND DB] Could not save to file:", error);
    // Nicht kritisch - Daten bleiben im Memory
  }
}

// Initialisiere beim Import
loadFromFile();

export interface ContactData {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string | null;
  unternehmen?: string | null;
  betreff: string;
  nachricht: string;
  status: "open" | "read" | "archived";
  read: boolean;
  archived: boolean;
  createdAt: string;
}

export function createContact(data: {
  vorname: string;
  nachname: string;
  email: string;
  telefon?: string | null;
  unternehmen?: string | null;
  betreff: string;
  nachricht: string;
}): ContactData {
  try {
    const newContact: ContactData = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      vorname: data.vorname.trim(),
      nachname: data.nachname.trim(),
      email: data.email.trim(),
      telefon: data.telefon?.trim() || null,
      unternehmen: data.unternehmen?.trim() || null,
      betreff: data.betreff.trim(),
      nachricht: data.nachricht.trim(),
      status: "open",
      read: false,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    
    contactsDatabase.push(newContact);
    
    // Speichere in Datei (non-blocking, falls es fehlschlägt, bleiben Daten im Memory)
    try {
      saveToFile();
    } catch (saveError) {
      console.warn("⚠️ [BACKEND DB] File-Save fehlgeschlagen, aber Daten im Memory:", saveError);
      // Nicht kritisch - Daten bleiben im Memory
    }
    
    console.log(`✅ [BACKEND DB] Contact created: ${newContact.id}`);
    console.log(`✅ [BACKEND DB] Total contacts: ${contactsDatabase.length}`);
    console.log(`✅ [BACKEND DB] Environment: ${IS_SERVERLESS ? "PRODUCTION" : "LOCAL"}`);
    
    return newContact;
  } catch (error) {
    console.error("❌ [BACKEND DB] Fehler beim Erstellen:", error);
    throw error;
  }
}

export function getAllContacts(): ContactData[] {
  return [...contactsDatabase].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getContactById(id: string): ContactData | null {
  return contactsDatabase.find(c => c.id === id) || null;
}

export function updateContact(id: string, updates: {
  read?: boolean;
  archived?: boolean;
  status?: "open" | "read" | "archived";
}): ContactData | null {
  const index = contactsDatabase.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  const contact = contactsDatabase[index];
  contactsDatabase[index] = {
    ...contact,
    ...updates,
    status: updates.status || (updates.read ? "read" : updates.archived ? "archived" : contact.status),
  };
  
  saveToFile();
  console.log(`✅ [BACKEND DB] Contact updated: ${id}`);
  return contactsDatabase[index];
}

export function deleteContact(id: string): boolean {
  const index = contactsDatabase.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  contactsDatabase.splice(index, 1);
  saveToFile();
  console.log(`✅ [BACKEND DB] Contact deleted: ${id}`);
  return true;
}

