
"use server";

import { saveAnalyticsEvent } from "@/lib/database";

export async function trackAnalyticsEvent(
  type: string,
  page: string,
  metadata?: Record<string, any>
) {
  try {
    const ip = "unknown"; // Server Actions haben keinen direkten Zugriff auf Headers
    const userAgent = undefined;
    const referrer = undefined;

    saveAnalyticsEvent({
      type,
      page,
      referrer,
      userAgent,
      ip,
      metadata,
    });

    return { success: true };
  } catch (error) {
    console.warn("⚠️ [ANALYTICS] Tracking error (non-critical):", error);
    return { success: true }; // Nicht blockieren
  }
}

