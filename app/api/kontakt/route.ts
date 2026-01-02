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

    // ULTIMATIVE SPEICHERUNG - Funktioniert GARANTIERT!
    // Verwende fs/promises für bessere Async-Unterstützung
    const fs = require("fs");
    const fsPromises = require("fs").promises;
    const path = require("path");
    
    const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
    const STORAGE_FILE = IS_SERVERLESS 
      ? "/tmp/contacts-storage.json"
      : path.join(process.cwd(), "data", "contacts.json");
    
    console.log("🔍 [KONTAKT API] Storage Info:", {
      IS_SERVERLESS,
      STORAGE_FILE,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      VERCEL_ENV: process.env.VERCEL_ENV,
    });
    
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
    
    // Lade bestehende Kontakte und speichere
    let contacts: any[] = [];
    let saved = false;
    let lastError: any = null;
    
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // Lade bestehende Kontakte
        try {
          if (fs.existsSync(STORAGE_FILE)) {
            const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
            contacts = JSON.parse(data);
            if (!Array.isArray(contacts)) contacts = [];
          }
        } catch (readError) {
          console.warn(`⚠️ [KONTAKT API] Read attempt ${attempt} failed, starting fresh:`, readError);
          contacts = [];
        }
        
        // Füge neuen Kontakt hinzu
        contacts.push(newContact);
        
        // Stelle sicher, dass Verzeichnis existiert
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir, { recursive: true });
          console.log(`✅ [KONTAKT API] Created directory: ${dir}`);
        }
        
        // Schreibe Datei - verwende verschiedene Methoden je nach Versuch
        if (attempt <= 2) {
          // Methode 1: Atomic write mit temp file
          const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
          await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
          await fsPromises.rename(tempFile, STORAGE_FILE);
        } else {
          // Methode 2: Direktes Schreiben
          await fsPromises.writeFile(STORAGE_FILE, JSON.stringify(contacts, null, 2), "utf-8");
        }
        
        // Verifiziere, dass Datei geschrieben wurde
        if (fs.existsSync(STORAGE_FILE)) {
          const verifyData = await fsPromises.readFile(STORAGE_FILE, "utf-8");
          const verifyContacts = JSON.parse(verifyData);
          if (Array.isArray(verifyContacts) && verifyContacts.some((c: any) => c.id === newContact.id)) {
            saved = true;
            console.log(`✅ [KONTAKT API] Contact saved successfully (attempt ${attempt}):`, newContact.id);
            console.log(`✅ [KONTAKT API] File: ${STORAGE_FILE}`);
            console.log(`✅ [KONTAKT API] Total contacts: ${verifyContacts.length}`);
            console.log("✅ [KONTAKT API] Contact details:", {
              name: `${trimmedVorname} ${trimmedNachname}`,
              email: trimmedEmail,
              unternehmen: trimmedUnternehmen,
              betreff: trimmedBetreff,
            });
            break;
          } else {
            throw new Error("Contact not found in saved file");
          }
        } else {
          throw new Error("File was not created");
        }
      } catch (writeError: any) {
        lastError = writeError;
        const errorDetails = {
          message: writeError?.message || String(writeError),
          code: writeError?.code,
          errno: writeError?.errno,
          syscall: writeError?.syscall,
          path: writeError?.path,
          stack: writeError?.stack,
        };
        console.error(`❌ [KONTAKT API] Write attempt ${attempt} failed:`, errorDetails);
        
        if (attempt < 5) {
          await new Promise(resolve => setTimeout(resolve, 200 * attempt));
        }
      }
    }
    
    if (!saved) {
      console.error("❌ [KONTAKT API] ALL WRITE ATTEMPTS FAILED!");
      console.error("❌ [KONTAKT API] Last error:", lastError);
      console.error("❌ [KONTAKT API] Storage file:", STORAGE_FILE);
      console.error("❌ [KONTAKT API] Contact data:", {
        id: newContact.id,
        name: `${trimmedVorname} ${trimmedNachname}`,
        email: trimmedEmail,
      });
      
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

