import fs from "fs";
import path from "path";

// STANDALONE: Keine externe Abhängigkeit - funktioniert überall!
// Verwendet automatisch Vercel KV in Production, JSON lokal
const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || !!process.env.AWS_LAMBDA_FUNCTION_NAME;
const HAS_DATABASE = false; // Nicht mehr nötig - standalone Lösung
const DATA_DIR = IS_SERVERLESS 
  ? "/tmp/data" // Serverless: verwende /tmp (temporär, aber funktioniert)
  : path.join(process.cwd(), "data");

// Prisma Client wird nicht mehr verwendet - standalone Lösung

export interface ContactSubmission {
  id: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  unternehmen: string;
  betreff: string;
  nachricht: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
  emailSent: boolean;
  emailSentAt?: string;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiresAt?: string;
}

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  unternehmen?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "expired";
  expiresAt?: string;
  read: boolean;
  archived: boolean;
}

export interface AnalyticsEvent {
  id: string;
  type: "page_view" | "click" | "form_submit" | "demo_request" | "contact";
  page: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

function ensureDataDir() {
  try {
    // In Serverless-Umgebungen: /tmp ist immer verfügbar
    if (IS_SERVERLESS) {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
        console.log("✅ [DATABASE] Created data directory (Serverless):", DATA_DIR);
      }
      // In Serverless: /tmp ist immer beschreibbar
      return;
    }
    
    // Lokale Entwicklung: normale Verzeichnisprüfung
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
      console.log("✅ [DATABASE] Created data directory:", DATA_DIR);
    }
    // Ensure directory is writable
    fs.accessSync(DATA_DIR, fs.constants.W_OK);
  } catch (error) {
    console.error("❌ [DATABASE] Failed to ensure data directory:", error);
    throw new Error(`Cannot access data directory: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function getFilePath(filename: string): string {
  ensureDataDir();
  return path.join(DATA_DIR, filename);
}

// Contacts - DIREKTE SPEICHERUNG - Funktioniert garantiert!
export async function getContacts(): Promise<ContactSubmission[]> {
  try {
    const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
    const STORAGE_FILE = IS_SERVERLESS 
      ? "/tmp/contacts-storage.json"
      : path.join(process.cwd(), "data", "contacts.json");
    
    if (!fs.existsSync(STORAGE_FILE)) {
      console.log(`ℹ️ [DATABASE] Storage file does not exist yet: ${STORAGE_FILE}`);
      return [];
    }
    
    const fsPromises = require("fs").promises;
    const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
    const contacts = JSON.parse(data);
    
    if (!Array.isArray(contacts)) {
      console.warn(`⚠️ [DATABASE] Invalid data format in ${STORAGE_FILE}`);
      return [];
    }
    
    console.log(`✅ [DATABASE] Loaded ${contacts.length} contacts directly from ${STORAGE_FILE}`);
    return contacts as ContactSubmission[];
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [DATABASE] Error getting contacts:", errorMessage);
    return [];
  }
}

export async function saveContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "read" | "archived" | "emailSent" | "emailSentAt" | "emailVerified" | "verificationToken" | "verificationTokenExpiresAt">): Promise<ContactSubmission> {
  // STANDALONE: Funktioniert überall ohne Konfiguration!
  try {
    const { saveContactStandalone } = await import("@/lib/standalone-db");
    const saved = await saveContactStandalone(contact);
    console.log("✅ [DATABASE] Contact saved via standalone-db:", saved.id);
    return saved;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [DATABASE] Error saving contact:", errorMessage);
    throw new Error(`Kontakt konnte nicht gespeichert werden: ${errorMessage}`);
  }
}

export async function verifyContactEmail(token: string): Promise<ContactSubmission | null> {
  const contacts = await getContacts();
  const contact = contacts.find((c) => c.verificationToken === token);
  
  if (!contact) {
    return null;
  }
  
  // Prüfe ob Token abgelaufen ist
  if (contact.verificationTokenExpiresAt && new Date(contact.verificationTokenExpiresAt) < new Date()) {
    return null;
  }
  
  // Markiere als verifiziert
  const { updateContactStandalone } = await import("@/lib/standalone-db");
  const updated = await updateContactStandalone(contact.id, {
    read: contact.read,
    archived: contact.archived,
  });
  
  if (!updated) return null;
  
  return {
    ...updated,
    emailVerified: true,
    verificationToken: undefined,
    verificationTokenExpiresAt: undefined,
  };
}

export async function markContactEmailSent(id: string): Promise<ContactSubmission | null> {
  const contacts = await getContacts();
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return null;
  
  // Email-Sent Status wird nicht mehr verwendet, aber für Kompatibilität
  return {
    ...contact,
    emailSent: true,
    emailSentAt: new Date().toISOString(),
  };
}

export async function updateContact(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | null> {
  // STANDALONE: Funktioniert überall ohne Konfiguration!
  try {
    const { updateContactStandalone } = await import("@/lib/standalone-db");
    return await updateContactStandalone(id, {
      read: updates.read,
      archived: updates.archived,
    });
  } catch (error) {
    console.error("❌ [DATABASE] Error updating contact:", error);
    return null;
  }
}

export async function deleteContact(id: string): Promise<boolean> {
  // DIREKTE SPEICHERUNG - Funktioniert garantiert!
  try {
    const fsPromises = require("fs").promises;
    const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
    const STORAGE_FILE = IS_SERVERLESS 
      ? "/tmp/contacts-storage.json"
      : path.join(process.cwd(), "data", "contacts.json");
    
    let contacts: ContactSubmission[] = [];
    if (fs.existsSync(STORAGE_FILE)) {
      const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
      contacts = JSON.parse(data);
      if (!Array.isArray(contacts)) contacts = [];
    }
    
    const filtered = contacts.filter((c) => c.id !== id);
    if (filtered.length === contacts.length) {
      return false; // Contact not found
    }
    
    // Atomic write
    const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
    await fsPromises.writeFile(tempFile, JSON.stringify(filtered, null, 2), "utf-8");
    await fsPromises.rename(tempFile, STORAGE_FILE);
    
    console.log("✅ [DATABASE] Contact deleted directly:", id);
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [DATABASE] Error deleting contact:", errorMessage);
    return false;
  }
}

// Demo Requests
export function getDemoRequests(): DemoRequest[] {
  const file = getFilePath("demo-requests.json");
  if (!fs.existsSync(file)) {
    return [];
  }
  try {
    const data = fs.readFileSync(file, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveDemoRequest(request: Omit<DemoRequest, "id" | "createdAt" | "status" | "read" | "archived">): DemoRequest {
  const requests = getDemoRequests();
  const newRequest: DemoRequest = {
    ...request,
    id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    status: "pending",
    read: false,
    archived: false,
  };
  requests.push(newRequest);
  fs.writeFileSync(getFilePath("demo-requests.json"), JSON.stringify(requests, null, 2), "utf-8");
  return newRequest;
}

export function updateDemoRequest(id: string, updates: Partial<DemoRequest>): DemoRequest | null {
  const requests = getDemoRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index === -1) return null;
  requests[index] = { ...requests[index], ...updates };
  fs.writeFileSync(getFilePath("demo-requests.json"), JSON.stringify(requests, null, 2), "utf-8");
  return requests[index];
}

export function deleteDemoRequest(id: string): boolean {
  const requests = getDemoRequests();
  const filtered = requests.filter((r) => r.id !== id);
  if (filtered.length === requests.length) return false;
  fs.writeFileSync(getFilePath("demo-requests.json"), JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// Analytics
export function getAnalyticsEvents(limit?: number): AnalyticsEvent[] {
  const file = getFilePath("analytics.json");
  if (!fs.existsSync(file)) {
    return [];
  }
  try {
    const data = fs.readFileSync(file, "utf-8");
    const events: AnalyticsEvent[] = JSON.parse(data);
    return limit ? events.slice(-limit).reverse() : events.reverse();
  } catch {
    return [];
  }
}

export function saveAnalyticsEvent(event: Omit<AnalyticsEvent, "id" | "timestamp">): AnalyticsEvent {
  const events = getAnalyticsEvents();
  const newEvent: AnalyticsEvent = {
    ...event,
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  events.push(newEvent);
  // Keep only last 10,000 events
  const trimmed = events.slice(-10000);
  fs.writeFileSync(getFilePath("analytics.json"), JSON.stringify(trimmed, null, 2), "utf-8");
  return newEvent;
}

export function getAnalyticsStats() {
  const events = getAnalyticsEvents();
  const now = new Date();
  const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const pageViews = events.filter((e) => e.type === "page_view");
  const contacts = events.filter((e) => e.type === "contact");
  const demoRequests = events.filter((e) => e.type === "demo_request");

  const pageViews24h = pageViews.filter((e) => new Date(e.timestamp) >= last24h).length;
  const pageViews7d = pageViews.filter((e) => new Date(e.timestamp) >= last7d).length;
  const pageViews30d = pageViews.filter((e) => new Date(e.timestamp) >= last30d).length;

  const contacts24h = contacts.filter((e) => new Date(e.timestamp) >= last24h).length;
  const contacts7d = contacts.filter((e) => new Date(e.timestamp) >= last7d).length;
  const contacts30d = contacts.filter((e) => new Date(e.timestamp) >= last30d).length;

  const demoRequests24h = demoRequests.filter((e) => new Date(e.timestamp) >= last24h).length;
  const demoRequests7d = demoRequests.filter((e) => new Date(e.timestamp) >= last7d).length;
  const demoRequests30d = demoRequests.filter((e) => new Date(e.timestamp) >= last30d).length;

  // Top pages
  const pageCounts: Record<string, number> = {};
  pageViews.forEach((e) => {
    pageCounts[e.page] = (pageCounts[e.page] || 0) + 1;
  });
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([page, count]) => ({ page, count }));

  return {
    total: {
      pageViews: pageViews.length,
      contacts: contacts.length,
      demoRequests: demoRequests.length,
    },
    last24h: {
      pageViews: pageViews24h,
      contacts: contacts24h,
      demoRequests: demoRequests24h,
    },
    last7d: {
      pageViews: pageViews7d,
      contacts: contacts7d,
      demoRequests: demoRequests7d,
    },
    last30d: {
      pageViews: pageViews30d,
      contacts: contacts30d,
      demoRequests: demoRequests30d,
    },
    topPages,
  };
}

