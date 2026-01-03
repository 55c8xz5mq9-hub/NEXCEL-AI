"use server";

export const runtime = "nodejs";

/**
 * HIGH-END POST-FUNKTION
 * Wie Bewertungen - Instant sichtbar im Admin-Panel
 * Alles im Backend, keine API, keine externen Services
 */
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
    if (!formData?.firstName?.trim()) {
      return { success: false, error: "Vorname ist erforderlich" };
    }
    if (!formData?.lastName?.trim()) {
      return { success: false, error: "Nachname ist erforderlich" };
    }
    if (!formData?.email?.trim()) {
      return { success: false, error: "E-Mail ist erforderlich" };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      return { success: false, error: "Ungültige E-Mail-Adresse" };
    }
    if (!formData?.subject?.trim()) {
      return { success: false, error: "Betreff ist erforderlich" };
    }
    if (!formData?.message?.trim()) {
      return { success: false, error: "Nachricht ist erforderlich" };
    }
    if (formData.message.trim().length < 20) {
      return { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" };
    }

    // POST-FUNKTION - Wie Bewertungen, instant sichtbar!
    const { createPost } = await import("@/lib/contact-store");
    
    const post = createPost({
      vorname: formData.firstName.trim(),
      nachname: formData.lastName.trim(),
      email: formData.email.trim(),
      telefon: formData.phone?.trim() || null,
      unternehmen: formData.company?.trim() || null,
      betreff: formData.subject.trim(),
      nachricht: formData.message.trim(),
    });

    console.log("✅ [POST] Neuer Post erstellt:", post.id);
    console.log("✅ [POST] Sofort im Admin-Panel sichtbar!");

    return {
      success: true,
      id: post.id,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
    };
  } catch (error) {
    console.error("❌ [POST] Fehler:", error);
    return {
      success: false,
      error: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
    };
  }
}

