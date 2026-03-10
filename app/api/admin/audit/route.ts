import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";

export async function GET(req: Request) {
  try {
    await requireAdminOrThrow();

    const { searchParams } = new URL(req.url);

    const action = (searchParams.get("action") || "").trim();
    const entity = (searchParams.get("entity") || "").trim();
    const actorEmail = (searchParams.get("actorEmail") || "").trim();

    const page = Math.max(1, Number(searchParams.get("page") || "1"));
    const pageSize = Math.min(200, Math.max(10, Number(searchParams.get("pageSize") || "50")));
    const skip = (page - 1) * pageSize;

    const where: any = {};
    if (action) where.action = { contains: action, mode: "insensitive" };
    if (entity) where.entity = { equals: entity };
    if (actorEmail) where.actorEmail = { contains: actorEmail, mode: "insensitive" };

    const [total, rows] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          createdAt: true,
          ip: true,
          action: true,
          entity: true,
          entityId: true,
          actorId: true,
          actorEmail: true,
          details: true,
        },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      meta: {
        page,
        pageSize,
        total,
        pages: Math.max(1, Math.ceil(total / pageSize)),
      },
      rows,
    });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}