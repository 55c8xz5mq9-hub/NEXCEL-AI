import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * POST /api/kontakt
 * 
 * Speichert Kontaktanfragen in der Datenbank (keine E-Mails mehr).
 * Flow: Formular → API → Datenbank → Admin-Dashboard
 * 
 * @param request - NextRequest mit Formulardaten
 * @returns NextResponse mit success/error Status
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ [KONTAKT API] JSON Parse Error:", errorMessage);
      return NextResponse.json(
        { success: false, error: "Ungültige Anfrage. Bitte versuchen Sie es erneut." },
        { status: 400 }
      );
    }

    const { vorname, nachname, email, telefon, unternehmen, betreff, nachricht } = body;

    // Validation - trim all string fields
    const trimmedVorname = typeof vorname === 'string' ? vorname.trim() : '';
    const trimmedNachname = typeof nachname === 'string' ? nachname.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedTelefon = typeof telefon === 'string' ? telefon.trim() : '';
    const trimmedUnternehmen = typeof unternehmen === 'string' ? unternehmen.trim() : '';
    const trimmedBetreff = typeof betreff === 'string' ? betreff.trim() : '';
    const trimmedNachricht = typeof nachricht === 'string' ? nachricht.trim() : '';

    // Pflichtfelder prüfen
    if (!trimmedVorname) {
      return NextResponse.json(
        { success: false, error: "Vorname ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedNachname) {
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

    if (!trimmedTelefon) {
      return NextResponse.json(
        { success: false, error: "Telefonnummer ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedUnternehmen) {
      return NextResponse.json(
        { success: false, error: "Unternehmen ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedBetreff) {
      return NextResponse.json(
        { success: false, error: "Betreff ist erforderlich" },
        { status: 400 }
      );
    }

    if (!trimmedNachricht) {
      return NextResponse.json(
        { success: false, error: "Nachricht ist erforderlich" },
        { status: 400 }
      );
    }

    if (trimmedNachricht.length < 20) {
      return NextResponse.json(
        { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" },
        { status: 400 }
      );
    }

    // Save to database - CRITICAL: This is the primary storage method
    // Keine E-Mails mehr - alle Anfragen werden nur in der DB gespeichert
    let contact: { id: string } | null = null;
    try {
      const { saveContact } = await import("@/lib/database");
      contact = saveContact({
        vorname: trimmedVorname,
        nachname: trimmedNachname,
        email: trimmedEmail,
        telefon: trimmedTelefon,
        unternehmen: trimmedUnternehmen,
        betreff: trimmedBetreff,
        nachricht: trimmedNachricht,
      });
      console.log("✅ [KONTAKT API] Contact saved to database:", contact.id);
      console.log("✅ [KONTAKT API] Contact details:", {
        name: `${trimmedVorname} ${trimmedNachname}`,
        email: trimmedEmail,
        unternehmen: trimmedUnternehmen,
        betreff: trimmedBetreff,
      });
    } catch (err) {
      // Database save failed - log detailed error
      const errorMessage = err instanceof Error ? err.message : String(err);
      const errorStack = err instanceof Error ? err.stack : "No stack";
      
      console.error("❌ [KONTAKT API] Database Save Failed:");
      console.error("  Error:", errorMessage);
      console.error("  Stack:", errorStack);
      console.error("  Full Error:", err);
      
      // Return user-friendly error message with detailed logging
      return NextResponse.json(
        { 
          success: false, 
          error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut." 
        },
        { status: 500 }
      );
    }

    // Track analytics (non-blocking, optional)
    try {
      const { saveAnalyticsEvent } = await import("@/lib/database");
      const ip = request.headers.get("x-forwarded-for") || 
                 request.headers.get("x-real-ip") || 
                 "unknown";
      saveAnalyticsEvent({
        type: "contact",
        page: "/kontakt",
        ip,
        metadata: { contactId: contact.id },
      });
    } catch (err) {
      console.warn("⚠️ [KONTAKT API] Analytics tracking failed (non-critical):", err);
    }

    // Contact is now saved in database and will appear in Admin Dashboard
    // No email sending - all contacts are managed through the admin interface
    console.log("✅ [KONTAKT API] Contact saved successfully. Available in Admin Dashboard.");

    return NextResponse.json({ 
      success: true,
      id: contact.id,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
    }, { status: 201 });
  } catch (error) {
    // Unhandled exception - log everything
    const errorType = error instanceof Error ? error.constructor.name : typeof error;
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : "No stack trace";
    
    console.error("❌ [KONTAKT API] Unhandled Exception:");
    console.error("  Error Type:", errorType);
    console.error("  Error Message:", errorMessage);
    console.error("  Error Stack:", errorStack);
    console.error("  Full Error Object:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." 
      },
      { status: 500 }
    );
  }
}

