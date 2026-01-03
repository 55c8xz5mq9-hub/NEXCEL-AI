/**
 * POST /api/analytics/track
 * 
 * FALLBACK für alte API-Calls - einfach nur loggen, keine Speicherung
 * Analytics ist nicht kritisch und sollte die Seite nicht blockieren
 */

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    // Parse body - mit Fehlerbehandlung
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      // Wenn JSON-Parse fehlschlägt, einfach success zurückgeben
      return NextResponse.json({ success: true });
    }

    const { type, page, metadata } = body || {};

    // Einfach nur loggen - Analytics ist nicht kritisch
    console.log("📊 [ANALYTICS]", { type, page, timestamp: new Date().toISOString() });

    // Immer success zurückgeben - Analytics sollte nie Fehler werfen
    return NextResponse.json({ success: true });
  } catch (error) {
    // Analytics-Fehler sollten die Seite nie blockieren
    // Immer success zurückgeben, auch bei Fehlern
    return NextResponse.json({ success: true });
  }
}

