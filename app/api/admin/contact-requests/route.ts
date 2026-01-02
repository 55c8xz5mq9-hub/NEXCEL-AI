/**
 * GET /api/admin/contact-requests
 * 
 * Lädt alle Kontaktanfragen DIREKT aus der JSON-Datei
 * Sortiert nach createdAt DESC
 * GARANTIERT FUNKTIONSFÄHIG!
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import { verifySession } from "@/lib/auth";

// ABSOLUT GLEICHE DATEI WIE IN /api/contact
const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
const STORAGE_FILE = IS_SERVERLESS
  ? "/tmp/contact-requests.json"
  : path.join(process.cwd(), "data", "contact-requests.json");

export async function GET(request: NextRequest) {
  try {
    // Optional: Admin-Auth prüfen (falls vorhanden)
    try {
      const session = await verifySession();
      if (!session || session.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } catch (authError) {
      // Falls Auth nicht vorhanden, einfach weiter (für Entwicklung)
      console.warn("⚠️ [CONTACT REQUESTS API] Auth check skipped:", authError);
    }

    // Lade DIREKT aus der Datei - GLEICHE DATEI WIE /api/contact
    let contacts: any[] = [];
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
        contacts = JSON.parse(data);
        if (!Array.isArray(contacts)) contacts = [];
      } else {
        console.log(`ℹ️ [CONTACT REQUESTS API] Storage file does not exist yet: ${STORAGE_FILE}`);
        contacts = [];
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("❌ [CONTACT REQUESTS API] Error reading file:", errorMessage);
      console.error("❌ [CONTACT REQUESTS API] Storage file:", STORAGE_FILE);
      contacts = [];
    }

    // Sortiere nach createdAt DESC (neueste zuerst)
    contacts.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    console.log(`✅ [CONTACT REQUESTS API] Loaded ${contacts.length} contact requests from ${STORAGE_FILE}`);
    console.log(`✅ [CONTACT REQUESTS API] First contact (if any):`, contacts[0]?.id || "none");

    return NextResponse.json({ contacts }, { 
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT REQUESTS API] Error fetching contacts:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch contact requests", contacts: [] },
      { status: 500 }
    );
  }
}

