import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, page, metadata } = body;

    if (!type || !page) {
      return NextResponse.json(
        { success: false, error: "Type and page are required" },
        { status: 400 }
      );
    }

    // Analytics-Tracking - Non-blocking, keine Fehler werfen
    // Wird einfach geloggt, keine Speicherung erforderlich
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || undefined;

    // Log analytics event (non-blocking)
    console.log("📊 [ANALYTICS]", { type, page, referrer, ip });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Analytics-Fehler sollten die Seite nicht blockieren
    console.warn("⚠️ [ANALYTICS] Tracking error (non-critical):", error);
    return NextResponse.json({ success: true }); // Immer success zurückgeben
  }
}

