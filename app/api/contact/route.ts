/**
 * POST /api/contact
 * 
 * PERSISTENTE DATENBANK-SPEICHERUNG
 * Speichert Kontaktanfragen direkt in PostgreSQL über Prisma
 * Komplett unabhängig von Mail/Resend/File-System
 * 
 * Datenfluss:
 * Kontaktformular ➜ /api/contact ➜ Prisma/PostgreSQL ➜ /api/admin/contact-posts ➜ Admin-Feed
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ [CONTACT API] JSON Parse Error:", errorMessage);
      return NextResponse.json(
        { success: false, error: "Ungültige Anfrage. Bitte versuchen Sie es erneut." },
        { status: 400 }
      );
    }

    // Extrahiere Felder (unterstützt beide Formate: vorname/nachname und firstName/lastName)
    const firstName = body.firstName || body.vorname || "";
    const lastName = body.lastName || body.nachname || "";
    const email = body.email || "";
    const phone = body.phone || body.telefon || "";
    const company = body.company || body.unternehmen || "";
    const subject = body.subject || body.betreff || "";
    const message = body.message || body.nachricht || "";

    // Trim all fields
    const trimmedFirstName = typeof firstName === "string" ? firstName.trim() : "";
    const trimmedLastName = typeof lastName === "string" ? lastName.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedPhone = typeof phone === "string" ? phone.trim() : "";
    const trimmedCompany = typeof company === "string" ? company.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Pflichtfelder prüfen
    if (!trimmedFirstName) {
      return NextResponse.json(
        { success: false, error: "Vorname ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedLastName) {
      return NextResponse.json(
        { success: false, error: "Nachname ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedEmail) {
      return NextResponse.json(
        { success: false, error: "E-Mail ist erforderlich" },
        { status: 400 }
      );
    }

    // E-Mail-Format prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    if (!trimmedSubject) {
      return NextResponse.json(
        { success: false, error: "Betreff ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedMessage) {
      return NextResponse.json(
        { success: false, error: "Nachricht ist erforderlich" },
        { status: 400 }
      );
    }

    if (trimmedMessage.length < 20) {
      return NextResponse.json(
        { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" },
        { status: 400 }
      );
    }

    // EINFACHE POST-FUNKTION - SPEICHERT DIREKT IN DATENBANK
    // Wie ein Forum-Post: Formular absenden ➜ Sofort im Admin-Panel sichtbar
    const newContact = await prisma.contactRequest.create({
      data: {
        vorname: trimmedFirstName,
        nachname: trimmedLastName,
        email: trimmedEmail,
        telefon: trimmedPhone || null,
        unternehmen: trimmedCompany || null,
        betreff: trimmedSubject,
        nachricht: trimmedMessage,
        status: "open",
        read: false,
        archived: false,
      },
    });

    console.log("✅ [CONTACT POST] Neuer Post erstellt:", newContact.id);
    console.log("✅ [CONTACT POST] Sofort im Admin-Panel sichtbar");

    return NextResponse.json(
      {
        success: true,
        id: newContact.id,
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT POST] Fehler:", errorMessage);
    console.error("❌ [CONTACT POST] Full Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}
