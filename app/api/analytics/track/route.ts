/**
 * POST /api/analytics/track
 * 
 * FALLBACK für alte API-Calls - leitet zu Server Action um
 * Wird automatisch aufgerufen, wenn noch alte fetch-Calls existieren
 */

import { NextRequest, NextResponse } from "next/server";
import { saveAnalyticsEvent } from "@/lib/database";

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

    // Speichere direkt über database.ts
    saveAnalyticsEvent({
      type,
      page,
      referrer: request.headers.get("referer") || undefined,
      userAgent: request.headers.get("user-agent") || undefined,
      ip: request.headers.get("x-forwarded-for") || 
          request.headers.get("x-real-ip") || 
          "unknown",
      metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Analytics-Fehler sollten die Seite nicht blockieren
    console.warn("⚠️ [ANALYTICS] Tracking error (non-critical):", error);
    return NextResponse.json({ success: true }); // Immer success zurückgeben
  }
}

