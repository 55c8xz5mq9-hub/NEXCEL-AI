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
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT POST] Fehler:", errorMessage);
    console.error("❌ [CONTACT POST] Full Error:", error);

    return {
      success: false,
      error: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
    };
  }
}

