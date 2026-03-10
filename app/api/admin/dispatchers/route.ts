import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";

export async function GET() {
  try {
    await requireAdminOrThrow();

    const users = await prisma.user.findMany({
      where: { role: "DISPATCHER", isActive: true },
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json({ ok: true, users });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}