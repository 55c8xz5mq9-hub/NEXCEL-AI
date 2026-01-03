"use server";

import { prisma } from "@/lib/prisma";

export async function submitContactForm(formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}) {
  try {
    // Validierung
    if (!formData.firstName?.trim()) {
      return { success: false, error: "Vorname ist erforderlich" };
    }

    if (!formData.lastName?.trim()) {
      return { success: false, error: "Nachname ist erforderlich" };
    }

    if (!formData.email?.trim()) {
      return { success: false, error: "E-Mail ist erforderlich" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return { success: false, error: "Ungültige E-Mail-Adresse" };
    }

    if (!formData.subject?.trim()) {
      return { success: false, error: "Betreff ist erforderlich" };
    }

    if (!formData.message?.trim()) {
      return { success: false, error: "Nachricht ist erforderlich" };
    }

    if (formData.message.trim().length < 20) {
      return { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" };
    }

    // DIREKT IN DATENBANK SPEICHERN - KEIN API-CALL!
    // Prüfe ob Prisma verfügbar ist
    if (!prisma || typeof prisma.contactRequest === "undefined") {
      console.error("❌ [CONTACT POST] Prisma Client nicht verfügbar");
      return {
        success: false,
        error: "Datenbankverbindung nicht verfügbar. Bitte kontaktieren Sie den Administrator.",
      };
    }

    try {
      const newContact = await prisma.contactRequest.create({
        data: {
          vorname: formData.firstName.trim(),
          nachname: formData.lastName.trim(),
          email: formData.email.trim(),
          telefon: formData.phone?.trim() || null,
          unternehmen: formData.company?.trim() || null,
          betreff: formData.subject.trim(),
          nachricht: formData.message.trim(),
          status: "open",
          read: false,
          archived: false,
        },
      });

      console.log("✅ [CONTACT POST] Neuer Post erstellt:", newContact.id);
      console.log("✅ [CONTACT POST] Sofort im Admin-Panel sichtbar");

      return {
        success: true,
        id: newContact.id,
        message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
      };
    } catch (dbError: any) {
      const errorMessage = dbError instanceof Error ? dbError.message : String(dbError);
      const errorCode = dbError?.code || "UNKNOWN";
      
      console.error("❌ [CONTACT POST] Datenbank-Fehler:", errorMessage);
      console.error("❌ [CONTACT POST] Error Code:", errorCode);
      console.error("❌ [CONTACT POST] Full Error:", dbError);

      // Spezifische Fehlermeldungen
      let userMessage = "Fehler beim Speichern. Bitte versuchen Sie es erneut.";
      
      if (errorCode === "P1001" || errorMessage.includes("Can't reach database")) {
        userMessage = "Datenbankverbindung fehlgeschlagen. Bitte versuchen Sie es später erneut.";
      } else if (errorMessage.includes("does not exist") || errorMessage.includes("relation")) {
        userMessage = "Datenbanktabelle nicht gefunden. Bitte führen Sie die Datenbankmigration aus.";
      } else if (errorCode === "P2002") {
        userMessage = "Ein Eintrag mit diesen Daten existiert bereits.";
      }

      return {
        success: false,
        error: userMessage,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT POST] Unerwarteter Fehler:", errorMessage);
    console.error("❌ [CONTACT POST] Full Error:", error);

    return {
      success: false,
      error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.",
    };
  }
}

