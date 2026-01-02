import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  unternehmen?: string;
  nachricht: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
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
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function getFilePath(filename: string): string {
  ensureDataDir();
  return path.join(DATA_DIR, filename);
}

// Contacts
export function getContacts(): ContactSubmission[] {
  const file = getFilePath("contacts.json");
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

export function saveContact(contact: Omit<ContactSubmission, "id" | "createdAt" | "read" | "archived">): ContactSubmission {
  const contacts = getContacts();
  const newContact: ContactSubmission = {
    ...contact,
    id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
    read: false,
    archived: false,
  };
  contacts.push(newContact);
  fs.writeFileSync(getFilePath("contacts.json"), JSON.stringify(contacts, null, 2), "utf-8");
  return newContact;
}

export function updateContact(id: string, updates: Partial<ContactSubmission>): ContactSubmission | null {
  const contacts = getContacts();
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...updates };
  fs.writeFileSync(getFilePath("contacts.json"), JSON.stringify(contacts, null, 2), "utf-8");
  return contacts[index];
}

export function deleteContact(id: string): boolean {
  const contacts = getContacts();
  const filtered = contacts.filter((c) => c.id !== id);
  if (filtered.length === contacts.length) return false;
  fs.writeFileSync(getFilePath("contacts.json"), JSON.stringify(filtered, null, 2), "utf-8");
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

