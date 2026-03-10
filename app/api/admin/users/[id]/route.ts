import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";
import { writeAudit } from "@/lib/audit";

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireAdminOrThrow();
    const actorId = Number(admin.sub);
    const actorEmail = admin.email;

    const { id } = await ctx.params;
    const userId = Number(id);
    if (!Number.isFinite(userId)) {
      return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const data: any = {};

    // Разрешаем менять только isActive (как и было)
    if (typeof body.isActive === "boolean") data.isActive = body.isActive;

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ ok: false, error: "no fields to update" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data,
      select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true },
    });

    await writeAudit({
      actorId: Number.isFinite(actorId) ? actorId : null,
      actorEmail,
      action: "user.update",
      entity: "User",
      entityId: userId,
      details: { changed: data, result: updated },
    });

    return NextResponse.json({ ok: true, user: updated });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}