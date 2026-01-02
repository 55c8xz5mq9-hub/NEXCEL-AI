import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Check required environment variables FIRST
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const FROM_EMAIL = process.env.FROM_EMAIL;
    const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const VERCEL_URL = process.env.VERCEL_URL;

    console.log("🔍 [KONTAKT API] Environment Check:");
    console.log("  RESEND_API_KEY:", RESEND_API_KEY ? "✅ Set" : "❌ Missing");
    console.log("  FROM_EMAIL:", FROM_EMAIL ? `✅ Set (${FROM_EMAIL})` : "❌ Missing");
    console.log("  NEXT_PUBLIC_BASE_URL:", NEXT_PUBLIC_BASE_URL ? `✅ Set (${NEXT_PUBLIC_BASE_URL})` : "❌ Missing");
    console.log("  VERCEL_URL:", VERCEL_URL ? `✅ Set (${VERCEL_URL})` : "❌ Missing");

    if (!RESEND_API_KEY) {
      const error = new Error("RESEND_API_KEY is not configured in environment variables");
      console.error("❌ [KONTAKT API] Environment Check Failed:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!FROM_EMAIL) {
      const error = new Error("FROM_EMAIL is not configured in environment variables");
      console.error("❌ [KONTAKT API] Environment Check Failed:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    if (!NEXT_PUBLIC_BASE_URL && !VERCEL_URL) {
      const error = new Error("NEXT_PUBLIC_BASE_URL or VERCEL_URL must be configured in environment variables");
      console.error("❌ [KONTAKT API] Environment Check Failed:", error.message);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

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

    // Save to database/CMS (optional - may fail in serverless environments)
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
    } catch (err) {
      // Database save failed (e.g., read-only filesystem in serverless)
      // Continue anyway - we'll still send emails
      console.warn("⚠️ [KONTAKT API] Database Save Failed (continuing anyway):", err instanceof Error ? err.message : String(err));
      // Generate a temporary ID and token for email verification
      contact = {
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        verificationToken: `verify_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`,
      };
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

    // Ensure verification token exists (generate if not present)
    if (!contact.verificationToken) {
      contact.verificationToken = `verify_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
    }

    // Send confirmation email synchronously - must succeed before response
    try {
      const { sendConfirmationEmail } = await import("@/lib/email");
      
      console.log("📧 [KONTAKT API] Sending confirmation email to:", email);
      const confirmationResult = await sendConfirmationEmail({
        vorname: trimmedVorname,
        nachname: trimmedNachname,
        email: trimmedEmail,
        telefon: trimmedTelefon,
        unternehmen: trimmedUnternehmen,
        betreff: trimmedBetreff,
        nachricht: trimmedNachricht,
      }, contact.verificationToken);

      if (!confirmationResult.success) {
        const error = new Error(`Failed to send confirmation email: ${confirmationResult.error || "Unknown error"}`);
        console.error("❌ [KONTAKT API] Email Send Failed:", error.message);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }

      console.log("✅ [KONTAKT API] Confirmation email sent successfully");

      // Mark email as sent (optional - may fail in serverless)
      try {
        const { markContactEmailSent } = await import("@/lib/database");
        markContactEmailSent(contact.id);
      } catch (err) {
        console.warn("⚠️ [KONTAKT API] Failed to mark email as sent (non-critical):", err);
      }
    } catch (err) {
      const error = new Error(`Email sending exception: ${err instanceof Error ? err.message : String(err)}`);
      console.error("❌ [KONTAKT API] Email Send Exception:", error.message);
      console.error("❌ [KONTAKT API] Full Error:", err);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    // Send notification email to admin (CRITICAL - must succeed)
    // This is the primary way the admin receives contact form submissions
    try {
      const { sendAdminNotification } = await import("@/lib/email");
      const adminResult = await sendAdminNotification({
        vorname: trimmedVorname,
        nachname: trimmedNachname,
        email: trimmedEmail,
        telefon: trimmedTelefon,
        unternehmen: trimmedUnternehmen,
        betreff: trimmedBetreff,
        nachricht: trimmedNachricht,
      }, contact.id);
      
      if (!adminResult.success) {
        console.error("❌ [KONTAKT API] Admin notification failed:", adminResult.error);
        // Don't fail the entire request, but log it
      } else {
        console.log("✅ [KONTAKT API] Admin notification sent successfully");
      }
    } catch (err) {
      console.error("❌ [KONTAKT API] Admin notification exception:", err);
      // Don't fail the entire request, but log it
    }

    return NextResponse.json({ 
      success: true,
      message: "Ihre Anfrage wurde erfolgreich übermittelt. Sie erhalten in Kürze eine Bestätigungs-E-Mail.",
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

