// Client-side analytics tracking helper
// Use the API route /api/analytics/track instead
export function trackPageView(page: string) {
  if (typeof window === "undefined") return;
  
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "page_view",
      page,
    }),
  }).catch(console.error);
}

export function trackEvent(
  type: "click" | "form_submit" | "demo_request" | "contact",
  page: string,
  metadata?: Record<string, any>
) {
  if (typeof window === "undefined") return;
  
  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      page,
      metadata,
    }),
  }).catch(console.error);
}
