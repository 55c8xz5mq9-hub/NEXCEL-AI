"use server";

import { verifySession } from "@/lib/auth";
import { getAllPosts, updatePost, deletePost } from "@/lib/contact-store";

// POSTS laden - Instant sichtbar!
export async function getAdminContacts() {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized", contacts: [] };
    }

    // Lade Posts - IMMER aus File, garantiert aktuell
    const posts = getAllPosts();
    
    console.log(`✅ [ADMIN] Loaded ${posts.length} posts from store`);
    console.log(`✅ [ADMIN] First post ID: ${posts[0]?.id || "none"}`);
    
    const transformedContacts = posts.map((post) => ({
      id: post.id,
      name: `${post.vorname} ${post.nachname}`,
      email: post.email,
      telefon: post.telefon || undefined,
      unternehmen: post.unternehmen || undefined,
      betreff: post.betreff,
      nachricht: post.nachricht,
      createdAt: post.createdAt,
      read: post.read,
      archived: post.archived,
      status: post.status,
    }));

    console.log(`✅ [ADMIN] Loaded ${transformedContacts.length} posts`);
    return { contacts: transformedContacts };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to fetch posts", contacts: [] };
  }
}

// Post als gelesen markieren
export async function markContactAsRead(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const updated = updatePost(id, { read: true, status: "read" });
    if (!updated) return { error: "Post not found" };
    return { success: true, contact: updated };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to update post" };
  }
}

// Post archivieren
export async function archiveContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const updated = updatePost(id, { archived: true, status: "archived" });
    if (!updated) return { error: "Post not found" };
    return { success: true, contact: updated };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to archive post" };
  }
}

// Post löschen
export async function deleteAdminContact(id: string) {
  try {
    const session = await verifySession();
    if (!session || session.role !== "admin") {
      return { error: "Unauthorized" };
    }

    const success = deletePost(id);
    if (!success) return { error: "Post not found" };
    return { success: true };
  } catch (error) {
    console.error("❌ [ADMIN] Error:", error);
    return { error: "Failed to delete post" };
  }
}

