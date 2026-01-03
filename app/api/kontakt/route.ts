/**
 * POST /api/kontakt
 * 
 * FALLBACK für alte API-Calls - leitet zu Backend-DB um
 * Wird automatisch aufgerufen, wenn noch alte fetch-Calls existieren
 */

import { NextRequest, NextResponse } from "next/server";
import { createContact } from "@/lib/backend-db";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse body mit Fehlerbehandlung
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("❌ [KONTAKT API] JSON Parse Error:", parseError);
      return NextResponse.json(
        { success: false, error: "Ungültige Anfrage. Bitte versuchen Sie es erneut." },
        { status: 400 }
      );
    }
    
    const vorname = body?.vorname || body?.firstName || "";
    const nachname = body?.nachname || body?.lastName || "";
    const email = body?.email || "";
    const telefon = body?.telefon || body?.phone || "";
    const unternehmen = body?.unternehmen || body?.company || "";
    const betreff = body?.betreff || body?.subject || "";
    const nachricht = body?.nachricht || body?.message || "";

    // Validierung
    if (!vorname.trim()) {
      return NextResponse.json(
        { success: false, error: "Vorname ist erforderlich" },
        { status: 400 }
      );
    }

    if (!nachname.trim()) {
      return NextResponse.json(
        { success: false, error: "Nachname ist erforderlich" },
        { status: 400 }
      );
    }

    if (!email.trim()) {
      return NextResponse.json(
        { success: false, error: "E-Mail ist erforderlich" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    if (!betreff.trim()) {
      return NextResponse.json(
        { success: false, error: "Betreff ist erforderlich" },
        { status: 400 }
      );
    }

    if (!nachricht.trim()) {
      return NextResponse.json(
        { success: false, error: "Nachricht ist erforderlich" },
        { status: 400 }
      );
    }

    if (nachricht.trim().length < 20) {
      return NextResponse.json(
        { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" },
        { status: 400 }
      );
    }

    // DIREKT IN BACKEND-DB SPEICHERN - mit Fehlerbehandlung
    try {
      const newContact = createContact({
        vorname: vorname.trim(),
        nachname: nachname.trim(),
        email: email.trim(),
        telefon: telefon.trim() || null,
        unternehmen: unternehmen.trim() || null,
        betreff: betreff.trim(),
        nachricht: nachricht.trim(),
      });

      console.log("✅ [KONTAKT API] Neuer Post erstellt:", newContact.id);

      return NextResponse.json(
        {
          success: true,
          id: newContact.id,
          message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
        },
        { status: 201 }
      );
    } catch (dbError) {
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      console.error("❌ [KONTAKT API] Datenbank-Fehler:", errorMessage);
      console.error("❌ [KONTAKT API] Full Error:", dbError);

      return NextResponse.json(
        {
          success: false,
          error: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [KONTAKT API] Unerwarteter Fehler:", errorMessage);
    console.error("❌ [KONTAKT API] Full Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 }
    );
  }
}

