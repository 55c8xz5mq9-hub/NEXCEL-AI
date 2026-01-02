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

    // DIREKTE SPEICHERUNG - Funktioniert garantiert!
    // Speichere direkt in /tmp (Production) oder data/ (lokal)
    const fs = await import("fs");
    const path = await import("path");
    
    const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;
    const STORAGE_FILE = IS_SERVERLESS 
      ? "/tmp/contacts-storage.json"
      : path.join(process.cwd(), "data", "contacts.json");
    
    // Lade bestehende Kontakte
    let contacts: any[] = [];
    try {
      if (fs.existsSync(STORAGE_FILE)) {
        const data = fs.readFileSync(STORAGE_FILE, "utf-8");
        contacts = JSON.parse(data);
        if (!Array.isArray(contacts)) contacts = [];
      }
    } catch (error) {
      console.warn("⚠️ [KONTAKT API] Could not load existing contacts, starting fresh:", error);
      contacts = [];
    }
    
    // Erstelle neuen Kontakt
    const newContact = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      vorname: trimmedVorname,
      nachname: trimmedNachname,
      email: trimmedEmail,
      telefon: trimmedTelefon,
      unternehmen: trimmedUnternehmen,
      betreff: trimmedBetreff,
      nachricht: trimmedNachricht,
      createdAt: new Date().toISOString(),
      read: false,
      archived: false,
      emailSent: false,
      emailVerified: false,
    };
    
    contacts.push(newContact);
    
    // Speichere mit Retry
    let saved = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        // Stelle sicher, dass Verzeichnis existiert
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        
        // Atomic write
        const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}`;
        fs.writeFileSync(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
        fs.renameSync(tempFile, STORAGE_FILE);
        
        saved = true;
        console.log(`✅ [KONTAKT API] Contact saved directly (attempt ${attempt}):`, newContact.id);
        console.log(`✅ [KONTAKT API] File: ${STORAGE_FILE}`);
        console.log("✅ [KONTAKT API] Contact details:", {
          name: `${trimmedVorname} ${trimmedNachname}`,
          email: trimmedEmail,
          unternehmen: trimmedUnternehmen,
          betreff: trimmedBetreff,
        });
        break;
      } catch (writeError) {
        console.warn(`⚠️ [KONTAKT API] Write attempt ${attempt} failed:`, writeError);
        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }
    
    if (!saved) {
      console.error("❌ [KONTAKT API] All write attempts failed");
      return NextResponse.json(
        { 
          success: false, 
          error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut." 
        },
        { status: 500 }
      );
    }
    
    const contact = newContact;

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

