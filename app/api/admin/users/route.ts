import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";
import bcrypt from "bcryptjs";
import { writeAudit } from "@/lib/audit";

export async function GET() {
  try {
    await requireAdminOrThrow();

    const users = await prisma.user.findMany({
      orderBy: [{ role: "asc" }, { name: "asc" }],
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ ok: true, users });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}

export async function POST(req: Request) {
  try {
    const admin = await requireAdminOrThrow();
    const actorId = Number(admin.sub);
    const actorEmail = admin.email;

    const body = await req.json().catch(() => null);

    const email = body?.email?.toString().trim().toLowerCase();
    const name = body?.name?.toString().trim();
    const password = body?.password?.toString();
    const isActive = body?.isActive === false ? false : true;

    if (!email || !name || !password) {
      return NextResponse.json({ ok: false, error: "email, name, password required" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
        role: "DISPATCHER",
        isActive,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await writeAudit({
      actorId: Number.isFinite(actorId) ? actorId : null,
      actorEmail,
      action: "user.create",
      entity: "User",
      entityId: user.id,
      details: { email: user.email, role: user.role, isActive: user.isActive },
    });

    return NextResponse.json({ ok: true, user });
  } catch (e: any) {
    if (e?.code === "P2002") {
      return NextResponse.json({ ok: false, error: "email already exists" }, { status: 409 });
    }
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}