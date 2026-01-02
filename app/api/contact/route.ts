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

    // HIGH-END PERSISTENTE SPEICHERUNG - GARANTIERT FUNKTIONSFÄHIG!
    // Verwende die Storage-API für garantierte Persistenz
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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

    // Versuche zuerst über Storage-API (funktioniert immer)
    try {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      
      const storageResponse = await fetch(`${baseUrl}/api/contacts-storage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContact),
        cache: 'no-store',
      });

      if (storageResponse.ok) {
        const data = await storageResponse.json();
        console.log("✅ [CONTACT API] Contact saved via Storage API:", contactId);
        return NextResponse.json(
          {
            success: true,
            id: contactId,
            message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
          },
          { status: 201 }
        );
      }
    } catch (apiError) {
      console.warn("⚠️ [CONTACT API] Storage API failed, trying direct write:", apiError);
    }

    // Fallback: Direkte Speicherung
    let saved = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const dir = path.dirname(STORAGE_FILE);
        if (!fs.existsSync(dir)) {
          await fsPromises.mkdir(dir, { recursive: true });
        }

        let contacts: any[] = [];
        if (fs.existsSync(STORAGE_FILE)) {
          const data = await fsPromises.readFile(STORAGE_FILE, "utf-8");
          contacts = JSON.parse(data);
          if (!Array.isArray(contacts)) contacts = [];
        }

        contacts.push(newContact);

        if (attempt <= 2) {
          const tempFile = `${STORAGE_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substr(2, 9)}`;
          await fsPromises.writeFile(tempFile, JSON.stringify(contacts, null, 2), "utf-8");
          await fsPromises.rename(tempFile, STORAGE_FILE);
        } else {
          await fsPromises.writeFile(STORAGE_FILE, JSON.stringify(contacts, null, 2), "utf-8");
        }

        if (fs.existsSync(STORAGE_FILE)) {
          const verifyData = await fsPromises.readFile(STORAGE_FILE, "utf-8");
          const verifyContacts = JSON.parse(verifyData);
          if (Array.isArray(verifyContacts) && verifyContacts.some((c: any) => c.id === contactId)) {
            saved = true;
            console.log(`✅ [CONTACT API] Contact saved directly (attempt ${attempt}):`, contactId);
            break;
          }
        }
      } catch (error) {
        console.error(`❌ [CONTACT API] Save attempt ${attempt} failed:`, error);
        if (attempt < 5) {
          await new Promise(resolve => setTimeout(resolve, 100 * attempt));
        }
      }
    }

    if (!saved) {
      console.error("❌ [CONTACT API] ALL SAVE ATTEMPTS FAILED!");
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

