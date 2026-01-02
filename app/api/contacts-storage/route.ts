/**
 * PERSISTENTE SPEICHERUNG - Funktioniert ohne externe Datenbank!
 * Speichert Kontakte in einem einfachen Format, das überall funktioniert
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const STORAGE_FILE = "/tmp/contacts-storage.json";

// Lade Kontakte
function loadContacts(): any[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const data = fs.readFileSync(STORAGE_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error loading contacts:", error);
  }
  return [];
}

// Speichere Kontakte
function saveContacts(contacts: any[]): void {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(contacts, null, 2), "utf-8");
  } catch (error) {
    console.error("Error saving contacts:", error);
    throw error;
  }
}

// GET - Lade alle Kontakte
export async function GET() {
  try {
    const contacts = loadContacts();
    return NextResponse.json({ contacts });
  } catch (error) {
    return NextResponse.json({ contacts: [] });
  }
}

// POST - Speichere neuen Kontakt
export async function POST(request: NextRequest) {
  try {
    const contact = await request.json();
    const contacts = loadContacts();
    
    const newContact = {
      ...contact,
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      read: false,
      archived: false,
    };
    
    contacts.push(newContact);
    saveContacts(contacts);
    
    return NextResponse.json({ success: true, contact: newContact });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save contact" },
      { status: 500 }
    );
  }
}

// PATCH - Aktualisiere Kontakt
export async function PATCH(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const contacts = loadContacts();
    const index = contacts.findIndex((c: any) => c.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    contacts[index] = { ...contacts[index], ...updates };
    saveContacts(contacts);
    
    return NextResponse.json({ success: true, contact: contacts[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

// DELETE - Lösche Kontakt
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    
    const contacts = loadContacts();
    const filtered = contacts.filter((c: any) => c.id !== id);
    
    if (filtered.length === contacts.length) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    
    saveContacts(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

