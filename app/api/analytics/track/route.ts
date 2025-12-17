import { NextRequest, NextResponse } from "next/server";
import { saveAnalyticsEvent } from "@/lib/database";

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

    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || undefined;
    const referrer = request.headers.get("referer") || undefined;

    saveAnalyticsEvent({
      type,
      page,
      referrer,
      userAgent,
      ip,
      metadata,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track event" },
      { status: 500 }
    );
  }
}

