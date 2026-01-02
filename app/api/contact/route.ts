/**
 * POST /api/contact
 * 
 * Speichert Kontaktanfragen in einer JSON-Datei
 * Komplett unabhängig von Mail/Resend/Prisma
 */

import { NextRequest, NextResponse } from "next/server";
import { saveContactRequest } from "@/lib/contactStore";

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

    // Speichere Kontaktanfrage
    try {
      const saved = await saveContactRequest({
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        phone: trimmedPhone || undefined,
        company: trimmedCompany || undefined,
        subject: trimmedSubject,
        message: trimmedMessage,
      });

      console.log("✅ [CONTACT API] Contact request saved successfully:", saved.id);

      return NextResponse.json(
        {
          success: true,
          id: saved.id,
          message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
        },
        { status: 201 }
      );
    } catch (saveError) {
      const errorMessage = saveError instanceof Error ? saveError.message : String(saveError);
      console.error("❌ [CONTACT API] Save Error:", errorMessage);
      console.error("❌ [CONTACT API] Full Error:", saveError);
      return NextResponse.json(
        { success: false, error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut." },
        { status: 500 }
      );
    }
  } catch (error) {
    // Unhandled exception
    const errorType = error instanceof Error ? error.constructor.name : typeof error;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "No stack trace";

    console.error("❌ [CONTACT API] Unhandled Exception:");
    console.error("  Error Type:", errorType);
    console.error("  Error Message:", errorMessage);
    console.error("  Error Stack:", errorStack);
    console.error("  Full Error Object:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      { status: 500 }
    );
  }
}

