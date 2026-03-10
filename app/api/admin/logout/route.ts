import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const name = process.env.ADMIN_COOKIE_NAME || "admin_token";
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ ok: true });
}
