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

// Persistenz über Datei-System (optional, für Server-Restarts)
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "contacts-backend.json");

// Lade Daten beim Start
function loadFromFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        contactsDatabase = parsed;
        console.log(`✅ [BACKEND DB] Loaded ${contactsDatabase.length} contacts from file`);
      }
    }
  } catch (error) {
    console.warn("⚠️ [BACKEND DB] Could not load from file, starting fresh:", error);
    contactsDatabase = [];
  }
}

// Speichere Daten in Datei
function saveToFile() {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(contactsDatabase, null, 2), "utf-8");
  } catch (error) {
    console.warn("⚠️ [BACKEND DB] Could not save to file:", error);
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
  saveToFile();
  
  console.log(`✅ [BACKEND DB] Contact created: ${newContact.id}`);
  return newContact;
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

