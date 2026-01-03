"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/auth";

// Lade alle Kontakt-Posts direkt aus der Datenbank - wie Forum-Posts
export async function getContactPosts() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { contacts: [] };
    }

    // Lade alle Posts direkt aus PostgreSQL, sortiert nach neuesten zuerst
    const contacts = await prisma.contactRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transformiere in Forum-Post-Format
    const posts = contacts.map((contact) => ({
      id: contact.id,
      name: `${contact.vorname} ${contact.nachname}`,
      email: contact.email,
      telefon: contact.telefon || undefined,
      unternehmen: contact.unternehmen || undefined,
      betreff: contact.betreff,
      nachricht: contact.nachricht,
      createdAt: contact.createdAt.toISOString(),
      read: contact.read,
      archived: contact.archived,
      status: contact.status,
    }));

    return { contacts: posts };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error loading contact posts:", error);
    return { contacts: [] };
  }
}

// Markiere Post als gelesen
export async function markContactAsRead(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { success: false };
    }

    await prisma.contactRequest.update({
      where: { id },
      data: { read: true, status: "read" },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error marking as read:", error);
    return { success: false };
  }
}

// Archiviere Post
export async function archiveContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { success: false };
    }

    await prisma.contactRequest.update({
      where: { id },
      data: { archived: true, status: "archived" },
    });

    return { success: true };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error archiving:", error);
    return { success: false };
  }
}

