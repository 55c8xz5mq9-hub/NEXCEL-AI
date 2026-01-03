/**
 * GET /api/admin/contact-posts
 * 
 * FEED-API FÜR ADMIN-PANEL
 * Lädt alle Kontaktanfragen aus PostgreSQL über Prisma
 * Sortiert nach createdAt DESC (neueste zuerst)
 * 
 * Datenfluss:
 * Kontaktformular ➜ /api/contact ➜ Prisma/PostgreSQL ➜ /api/admin/contact-posts ➜ Admin-Feed
 */

import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    // Admin-Authentifizierung prüfen
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Lade alle Kontaktanfragen aus PostgreSQL, sortiert nach createdAt DESC
    const contacts = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transformiere Prisma-Modell in Feed-Format
    const feedPosts = contacts.map((contact) => ({
      id: contact.id,
      firstName: contact.vorname,
      lastName: contact.nachname,
      email: contact.email,
      phone: contact.telefon || undefined,
      company: contact.unternehmen || undefined,
      subject: contact.betreff,
      message: contact.nachricht,
      status: contact.status,
      read: contact.read,
      archived: contact.archived,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
    }));

    console.log(`✅ [CONTACT POSTS API] Loaded ${feedPosts.length} contact posts from PostgreSQL`);

    return NextResponse.json(
      { posts: feedPosts },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("❌ [CONTACT POSTS API] Error fetching contact posts:", errorMessage);
    console.error("❌ [CONTACT POSTS API] Full Error:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch contact posts", posts: [] },
      { status: 500 }
    );
  }
}

