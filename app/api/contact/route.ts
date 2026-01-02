/**
 * POST /api/contact
 * 
 * Speichert Kontaktanfragen DIREKT in einer JSON-Datei
 * Komplett unabhängig von Mail/Resend/Prisma
 * GARANTIERT FUNKTIONSFÄHIG!
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

export const runtime = "nodejs";

// ABSOLUT GLEICHE DATEI FÜR ALLE
const IS_SERVERLESS = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV || process.env.NODE_ENV === "production";
const STORAGE_FILE = IS_SERVERLESS
  ? "/tmp/contact-requests.json"
  : path.join(process.cwd(), "data", "contact-requests.json");

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

    // DIREKTE SPEICHERUNG - GARANTIERT FUNKTIONSFÄHIG!
    let saved = false;
    let contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let lastError: any = null;

    // 5 Versuche mit verschiedenen Methoden
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        // Stelle sicher, dass Verzeichnis existiert
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir, { recursive: true });
          console.log(`✅ [CONTACT API] Created directory: ${dir}`);
        }

        // Lade bestehende Kontakte
        let contacts: any[] = [];
        try {
          if (fs.existsSync(STORAGE_FILE)) {
            const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
            contacts = JSON.parse(data);
            if (!Array.isArray(contacts)) contacts = [];
          }
        } catch (readError) {
          console.warn(`⚠️ [CONTACT API] Read attempt ${attempt} failed, starting fresh:`, readError);
          contacts = [];
        }

        // Erstelle neuen Kontakt
        const newContact = {
          id: contactId,
          createdAt: new Date().toISOString(),
          firstName: trimmedFirstName,
          lastName: trimmedLastName,
          email: trimmedEmail,
          phone: trimmedPhone || undefined,
          company: trimmedCompany || undefined,
          subject: trimmedSubject,
          message: trimmedMessage,
          status: "open",
        };

        contacts.push(newContact);

        // Schreibe Datei
        if (attempt <= 2) {
          // Methode 1: Atomic write
          const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
          await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
          await fsPromises.rename(tempFile, STORAGE_FILE);
        } else {
          // Methode 2: Direktes Schreiben
          await fsPromises.writeFile(STORAGE_FILE, JSON.stringify(contacts, null, 2), "utf-8");
        }

        // VERIFIZIERE, dass die Datei wirklich geschrieben wurde
        if (fs.existsSync(STORAGE_FILE)) {
          const verifyData = await fsPromises.readFile(STORAGE_FILE, "utf-8");
          const verifyContacts = JSON.parse(verifyData);
          if (Array.isArray(verifyContacts) && verifyContacts.some((c: any) => c.id === contactId)) {
            saved = true;
            console.log(`✅ [CONTACT API] Contact saved successfully (attempt ${attempt}):`, contactId);
            console.log(`✅ [CONTACT API] Total contacts: ${verifyContacts.length}`);
            console.log(`✅ [CONTACT API] File: ${STORAGE_FILE}`);
            break;
          } else {
            throw new Error("Contact not found in saved file after verification");
          }
        } else {
          throw new Error("File was not created");
        }
      } catch (error) {
        lastError = error;
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ [CONTACT API] Save attempt ${attempt} failed:`, errorMessage);
        
        if (attempt < 5) {
          await new Promise(resolve => setTimeout(resolve, 200 * attempt));
        }
      }
    }

    if (!saved) {
      const errorMessage = lastError instanceof Error ? lastError.message : String(lastError);
      console.error("❌ [CONTACT API] ALL SAVE ATTEMPTS FAILED!");
      console.error("❌ [CONTACT API] Last error:", errorMessage);
      console.error("❌ [CONTACT API] Storage file:", STORAGE_FILE);
      return NextResponse.json(
        { success: false, error: "Fehler beim Speichern der Anfrage. Bitte versuchen Sie es später erneut." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        id: contactId,
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      },
      { status: 201 }
    );
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

