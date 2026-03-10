import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";
import { writeAudit } from "@/lib/audit";

export async function GET() {
  try {
    await requireAdminOrThrow();

    const settings = await prisma.siteSettings.findFirst({
      orderBy: { id: "asc" },
    });

    return NextResponse.json({ ok: true, settings });
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

    const body = await req.json().catch(() => ({}));

    // Разрешённые поля (чтобы не записать мусор)
    const data: any = {};
    const allow = [
      "brandName",
      "brandTagline",
      "phone",
      "whatsapp",
      "telegram",
      "email",
      "workHours",
      "regionNote",
      "companyName",
      "inn",
      "ogrn",
      "address",
      "notes",
    ] as const;

    for (const k of allow) {
      if (k in body) data[k] = body[k] ?? null;
    }

    const updated = await prisma.siteSettings.upsert({
      where: { id: 1 },
      create: { id: 1, ...data },
      update: data,
    });

    await writeAudit({
      actorId: Number.isFinite(actorId) ? actorId : null,
      actorEmail,
      action: "settings.update",
      entity: "SiteSettings",
      entityId: 1,
      details: { changed: data },
    });

    return NextResponse.json({ ok: true, settings: updated });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}