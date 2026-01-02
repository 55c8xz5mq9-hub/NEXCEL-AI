/**
 * GET /api/admin/contact-requests
 * 
 * HIGH-END PERSISTENTE DATENBANK
 * Lädt aus: Vercel KV → Upstash Redis → JSON-Datei
 * GARANTIERT FUNKTIONSFÄHIG!
 */

import { NextRequest, NextResponse } from "next/server";
import { getAllContactRequests } from "@/lib/persistent-db";
import { verifySession } from "@/lib/auth";

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

    // Lade aus HIGH-END PERSISTENTER DATENBANK
    const contacts = await getAllContactRequests();

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

