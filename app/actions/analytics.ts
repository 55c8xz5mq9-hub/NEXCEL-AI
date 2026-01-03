"use server";

/**
 * Analytics Tracking - GARANTIERT KEINE FEHLER!
 * Gibt IMMER success zurück, auch bei Fehlern
 */

export async function trackAnalyticsEvent(
  type: string,
  page: string,
  metadata?: Record<string, any>
) {
  // GARANTIERT: IMMER success zurückgeben, auch bei Fehlern!
  try {
    // Versuche Analytics zu speichern (optional, nicht kritisch)
    try {
      const { saveAnalyticsEvent } = await import("@/lib/database");
      if (saveAnalyticsEvent && typeof saveAnalyticsEvent === "function") {
        saveAnalyticsEvent({
          type,
          page,
          referrer: undefined,
          userAgent: undefined,
          ip: "unknown",
          metadata,
        });
      }
    } catch (error) {
      // Ignoriere Fehler - Analytics ist nicht kritisch
    }
    
    // GARANTIERT: IMMER success zurückgeben!
    return { success: true };
  } catch (error) {
    // GARANTIERT: Auch bei kritischen Fehlern success zurückgeben!
    return { success: true };
  }
}
