import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, unternehmen, nachricht } = body;

    if (!name || !email || !nachricht) {
      return NextResponse.json(
        { success: false, error: "Alle Pflichtfelder müssen ausgefüllt sein" },
        { status: 400 }
      );
    }

    if (nachricht.length < 20) {
      return NextResponse.json(
        { success: false, error: "Nachricht muss mindestens 20 Zeichen lang sein" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Ungültige E-Mail-Adresse" },
        { status: 400 }
      );
    }

    // Save to database
    const { saveContact } = await import("@/lib/database");
    const contact = saveContact({
      name,
      email,
      unternehmen: unternehmen || undefined,
      nachricht,
    });

    // Track analytics
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

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Kontakt API Error:", error);
    return NextResponse.json(
      { success: false, error: "Server-Fehler beim Verarbeiten der Anfrage" },
      { status: 500 }
    );
  }
}

