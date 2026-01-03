"use server";

import { verifySession } from "@/lib/auth";
import { getAllContacts, updateContact, deleteContact } from "@/lib/backend-db";

// Admin-Kontakte laden
export async function getAdminContacts() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized", contacts: [] };
    }

    const contacts = getAllContacts();
    
    const transformedContacts = contacts.map((contact) => ({
      id: contact.id,
      name: `${contact.vorname} ${contact.nachname}`,
      email: contact.email,
      telefon: contact.telefon || undefined,
      unternehmen: contact.unternehmen || undefined,
      betreff: contact.betreff,
      nachricht: contact.nachricht,
      createdAt: contact.createdAt,
      read: contact.read,
      archived: contact.archived,
      status: contact.status,
    }));

    return { contacts: transformedContacts };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error fetching contacts:", error);
    return { error: "Failed to fetch contacts", contacts: [] };
  }
}

// Kontakt als gelesen markieren
export async function markContactAsRead(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const updated = updateContact(id, { read: true, status: "read" });
    if (!updated) {
      return { error: "Contact not found" };
    }

    return { success: true, contact: updated };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error updating contact:", error);
    return { error: "Failed to update contact" };
  }
}

// Kontakt archivieren
export async function archiveContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const updated = updateContact(id, { archived: true, status: "archived" });
    if (!updated) {
      return { error: "Contact not found" };
    }

    return { success: true, contact: updated };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error archiving contact:", error);
    return { error: "Failed to archive contact" };
  }
}

// Kontakt löschen
export async function deleteAdminContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const success = deleteContact(id);
    if (!success) {
      return { error: "Contact not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("❌ [ADMIN ACTION] Error deleting contact:", error);
    return { error: "Failed to delete contact" };
  }
}

