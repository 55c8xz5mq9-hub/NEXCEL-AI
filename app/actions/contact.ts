"use server";

export const runtime = "nodejs";

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
    console.log("🔵 [CONTACT ACTION] Server Action aufgerufen in:", process.env.NODE_ENV);
    
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

    // DIREKT IM BACKEND SPEICHERN - KOMPLETT VERANKERT, KEIN PRISMA, KEINE API!
    // Dynamischer Import für bessere Fehlerbehandlung
    let createContact;
    try {
      const backendDb = await import("@/lib/backend-db");
      createContact = backendDb.createContact;
    } catch (importError) {
      console.error("❌ [CONTACT ACTION] Import-Fehler:", importError);
      return {
        success: false,
        error: "Backend-Datenbank konnte nicht geladen werden. Bitte versuchen Sie es erneut.",
      };
    }

    if (!createContact || typeof createContact !== "function") {
      console.error("❌ [CONTACT ACTION] createContact ist keine Funktion");
      return {
        success: false,
        error: "Backend-Funktion nicht verfügbar. Bitte versuchen Sie es erneut.",
      };
    }

    const newContact = createContact({
      vorname: formData.firstName.trim(),
      nachname: formData.lastName.trim(),
      email: formData.email.trim(),
      telefon: formData.phone?.trim() || null,
      unternehmen: formData.company?.trim() || null,
      betreff: formData.subject.trim(),
      nachricht: formData.message.trim(),
    });

    console.log("✅ [CONTACT ACTION] Neuer Post erstellt:", newContact.id);
    console.log("✅ [CONTACT ACTION] Environment:", process.env.NODE_ENV);
    console.log("✅ [CONTACT ACTION] Vercel:", process.env.VERCEL);

    return {
      success: true,
      id: newContact.id,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Wir werden uns schnellstmöglich bei Ihnen melden.",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("❌ [CONTACT ACTION] Fehler:", errorMessage);
    console.error("❌ [CONTACT ACTION] Stack:", errorStack);
    console.error("❌ [CONTACT ACTION] Full Error:", error);
    console.error("❌ [CONTACT ACTION] Environment:", process.env.NODE_ENV);
    console.error("❌ [CONTACT ACTION] Vercel:", process.env.VERCEL);

    return {
      success: false,
      error: "Fehler beim Speichern. Bitte versuchen Sie es erneut.",
    };
  }
}

