import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // No email configuration needed - contacts are stored in database and shown in Admin Dashboard

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (err) {
      const error = new Error(`Invalid JSON in request body: ${err instanceof Error ? err.message : String(err)}`);
      console.error("❌ [KONTAKT API] JSON Parse Error:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
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

    if (!trimmedVorname || !trimmedNachname || !trimmedEmail || !trimmedTelefon || !trimmedUnternehmen || !trimmedBetreff || !trimmedNachricht) {
      return NextResponse.json(
        { success: false, error: "Alle Pflichtfelder müssen ausgefüllt sein" },
        { status: 400 }
      );
    }

    if (trimmedNachricht.length < 20) {
      return NextResponse.json(
        { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    // Save to database - CRITICAL: This is the primary storage method
    let contact: { id: string; verificationToken?: string } | null = null;
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
      });
    } catch (err) {
      // Database save failed - log detailed error
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ [KONTAKT API] Database Save Failed:");
      console.error("  Error:", errorMessage);
      console.error("  Stack:", err instanceof Error ? err.stack : "No stack");
      console.error("  Full Error:", err);
      
      // Return user-friendly error message
      return NextResponse.json(
        { 
          success: false, 
          error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt." 
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
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      contactId: contact.id,
    }, { status: 200 });
  } catch (error) {
    console.error("❌ [KONTAKT API] Unhandled Exception:");
    console.error("  Error Type:", error instanceof Error ? error.constructor.name : typeof error);
    console.error("  Error Message:", error instanceof Error ? error.message : String(error));
    console.error("  Error Stack:", error instanceof Error ? error.stack : "No stack trace");
    console.error("  Full Error Object:", error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : `Server-Fehler beim Verarbeiten der Anfrage: ${String(error)}`;
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

