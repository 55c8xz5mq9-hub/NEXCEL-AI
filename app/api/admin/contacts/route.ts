import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const archived = searchParams.get("archived") === "true";
    const unread = searchParams.get("unread") === "true";

    // Baue Prisma-Query mit Filtern
    const where: any = {};
    if (archived) {
      where.archived = true;
    } else {
      where.archived = false;
    }
    if (unread) {
      where.read = false;
    }

    // Lade Kontakte aus PostgreSQL über Prisma
    const contacts = await prisma.contactRequest.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform contacts to match AdminDashboard interface
    const transformedContacts = contacts.map((contact) => ({
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
    }));

    return NextResponse.json({ contacts: transformedContacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Update contact in PostgreSQL über Prisma
    const updated = await prisma.contactRequest.update({
      where: { id },
      data: {
        ...updates,
        // Map status to read/archived if needed
        read: updates.read !== undefined ? updates.read : undefined,
        archived: updates.archived !== undefined ? updates.archived : undefined,
        status: updates.status || undefined,
      },
    });

    if (!updated) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }

    return NextResponse.json({
      contact: {
        id: updated.id,
        name: `${updated.vorname} ${updated.nachname}`,
        email: updated.email,
        telefon: updated.telefon || undefined,
        unternehmen: updated.unternehmen || undefined,
        betreff: updated.betreff,
        nachricht: updated.nachricht,
        createdAt: updated.createdAt.toISOString(),
        read: updated.read,
        archived: updated.archived,
      },
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { error: "Failed to update contact" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete contact from PostgreSQL über Prisma
    try {
      await prisma.contactRequest.delete({
        where: { id },
      });
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}

