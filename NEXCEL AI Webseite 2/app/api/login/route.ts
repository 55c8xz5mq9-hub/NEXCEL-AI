import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail, updateUser } from "@/lib/demo-users";
import { createSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich." },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse oder Passwort." },
        { status: 401 }
      );
    }

    const expiresAt = new Date(user.expiresAt);
    const now = new Date();
    if (expiresAt < now) {
      return NextResponse.json(
        { error: "Dein Demo-Zugang ist abgelaufen. Bitte kontaktiere uns für einen Vollzugang." },
        { status: 403 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse oder Passwort." },
        { status: 401 }
      );
    }

    const session = await createSession(user);
    if (!session) {
      return NextResponse.json(
        { error: "Dein Demo-Zugang ist abgelaufen." },
        { status: 403 }
      );
    }

    updateUser(user.id, { lastLogin: new Date().toISOString() });

    const response = NextResponse.json({
      success: true,
      message: "Login erfolgreich.",
    });

    response.cookies.set("session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Math.floor((expiresAt.getTime() - now.getTime()) / 1000),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Ein Fehler ist aufgetreten. Bitte versuche es erneut." },
      { status: 500 }
    );
  }
}

