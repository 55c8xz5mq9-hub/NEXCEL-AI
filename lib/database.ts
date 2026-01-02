import fs from "fs";
import path from "path";

// Prüfe ob eine Datenbank-URL vorhanden ist (Prisma/PostgreSQL)
// DEAKTIVIERT: Verwende immer JSON-Datenbank für sofortige Funktionalität
const HAS_DATABASE = false; // Immer false - verwende JSON-Datenbank

// In Serverless-Umgebungen (z.B. Vercel) ist das Dateisystem read-only
// Verwende /tmp für temporäre Speicherung oder prüfe ob wir in einer Serverless-Umgebung sind
const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.AWS_LAMBDA_FUNCTION_NAME || !!process.env.VERCEL_ENV;
const DATA_DIR = IS_SERVERLESS 
  ? "/tmp/data" // Serverless: verwende /tmp (temporär, aber funktioniert)
  : path.join(process.cwd(), "data");

// Lazy load Prisma Client (nur wenn DATABASE_URL vorhanden)
let prismaClient: any = null;
async function getPrismaClient() {
  if (!HAS_DATABASE) return null;
  
  if (!prismaClient) {
    try {
      // Versuche zuerst den lokalen Prisma Client
      try {
        const { prisma } = await import("@/lib/prisma");
        prismaClient = prisma;
      } catch {
        // Fallback: Direkter Import von @prisma/client
        const { PrismaClient } = await import("@prisma/client");
        prismaClient = new PrismaClient({
          log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
        });
      }
    } catch (error) {
      console.error("❌ [DATABASE] Failed to load Prisma Client:", error);
      return null;
    }
  }
  return prismaClient;
}

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

// Contacts - JSON-Datenbank (primäre Lösung - funktioniert sofort)
export async function getContacts(): Promise<ContactSubmission[]> {
  // JSON-Datenbank - funktioniert sofort, keine Prisma-Abhängigkeit
  try {
    const file = getFilePath("contacts.json");
    if (!fs.existsSync(file)) {
      return [];
    }
    const data = fs.readFileSync(file, "utf-8");
    const contacts = JSON.parse(data);
    // Sortiere nach neuestem zuerst
    return contacts.sort((a: ContactSubmission, b: ContactSubmission) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("❌ [DATABASE] Error reading contacts:", error);
    // In Serverless: /tmp könnte leer sein beim ersten Aufruf
    if (IS_SERVERLESS) {
      console.warn("⚠️ [DATABASE] Serverless: Could not read contacts file, returning empty array");
    }
    return [];
  }
}

export async function saveContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "read" | "archived" | "emailSent" | "emailSentAt" | "emailVerified" | "verificationToken" | "verificationTokenExpiresAt">): Promise<ContactSubmission> {
  // JSON-Datenbank - primäre Lösung, funktioniert sofort
  try {
    const contacts = await getContacts();
    const verificationToken = `verify_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 Stunden gültig
    
    const newContact: ContactSubmission = {
      ...contact,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      read: false,
      archived: false,
      emailSent: false,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiresAt: expiresAt.toISOString(),
    };
    contacts.push(newContact);
    
    // Ensure data directory exists
    ensureDataDir();
    const filePath = getFilePath("contacts.json");
    
    // Try to write file with error handling
    try {
      // Use atomic write: write to temp file first, then rename
      const tempPath = `${filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(contacts, null, 2), "utf-8");
      fs.renameSync(tempPath, filePath);
      console.log("✅ [DATABASE] Contact saved successfully to:", filePath);
      if (IS_SERVERLESS) {
        console.log("⚠️ [DATABASE] Serverless mode: Data stored in /tmp (temporary). Consider using a database for production.");
      }
    } catch (writeError) {
      // If write fails, try to create directory again and retry
      console.warn("⚠️ [DATABASE] First write attempt failed, retrying...", writeError);
      try {
        ensureDataDir();
        const tempPath = `${filePath}.tmp`;
        fs.writeFileSync(tempPath, JSON.stringify(contacts, null, 2), "utf-8");
        fs.renameSync(tempPath, filePath);
        console.log("✅ [DATABASE] Contact saved successfully on retry");
      } catch (retryError) {
        console.error("❌ [DATABASE] Failed to save contact after retry:", retryError);
        // In Serverless: gebe hilfreichere Fehlermeldung
        if (IS_SERVERLESS) {
          throw new Error(`Serverless-Umgebung: Dateisystem-Schreibzugriff nicht möglich. Bitte verwenden Sie eine Datenbank (z.B. Vercel Postgres, Prisma mit Cloud-DB).`);
        }
        throw new Error(`Failed to write contact file: ${retryError instanceof Error ? retryError.message : String(retryError)}`);
      }
    }
    
    return newContact;
  } catch (error) {
    console.error("❌ [DATABASE] Failed to save contact:", error);
    throw new Error(`Failed to save contact: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function verifyContactEmail(token: string): ContactSubmission | null {
  const contacts = getContacts();
  const contact = contacts.find((c) => c.verificationToken === token);
  
  if (!contact) {
    return null;
  }
  
  // Prüfe ob Token abgelaufen ist
  if (contact.verificationTokenExpiresAt && new Date(contact.verificationTokenExpiresAt) < new Date()) {
    return null;
  }
  
  // Markiere als verifiziert
  const index = contacts.findIndex((c) => c.id === contact.id);
  if (index === -1) return null;
  
  contacts[index] = {
    ...contacts[index],
    emailVerified: true,
    verificationToken: undefined,
    verificationTokenExpiresAt: undefined,
  };
  
  fs.writeFileSync(getFilePath("contacts.json"), JSON.stringify(contacts, null, 2), "utf-8");
  return contacts[index];
}

export function markContactEmailSent(id: string): ContactSubmission | null {
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = { 
    ...contacts[index], 
    emailSent: true,
    emailSentAt: new Date().toISOString(),
  };
  fs.writeFileSync(getFilePath("contacts.json"), JSON.stringify(contacts, null, 2), "utf-8");
  return contacts[index];
}

export async function updateContact(id: string, updates: Partial<ContactSubmission>): Promise<ContactSubmission | null> {
  // JSON-Datenbank - funktioniert sofort
  const contacts = await getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updates };
  
  // Atomic write
  const filePath = getFilePath("contacts.json");
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(contacts, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
  
  console.log("✅ [DATABASE] Contact updated:", id);
  return contacts[index];
}

export async function deleteContact(id: string): Promise<boolean> {
  // JSON-Datenbank - funktioniert sofort
  const contacts = await getContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) return false;
  
  // Atomic write
  const filePath = getFilePath("contacts.json");
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(filtered, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
  
  console.log("✅ [DATABASE] Contact deleted:", id);
  return true;
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

