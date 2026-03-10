import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";

export async function GET(req: Request) {
  try {
    await requireAdminOrThrow();

    const url = new URL(req.url);
    const status = url.searchParams.get("status"); // new|in_progress|done|canceled
    const q = (url.searchParams.get("q") || "").trim();

    const where: any = {};
    if (status && status !== "all") where.status = status;

    if (q) {
      where.OR = [
        { phone: { contains: q, mode: "insensitive" } },
        { name: { contains: q, mode: "insensitive" } },
        { fromText: { contains: q, mode: "insensitive" } },
        { toText: { contains: q, mode: "insensitive" } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        name: true,
        phone: true,
        fromText: true,
        toText: true,
        datetime: true,
        carClass: true,
        roundTrip: true,
        price: true,
        commission: true,
        comment: true,
        status: true,
        assignedToId: true,
        isDuplicate: true,
        duplicateOfId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ ok: true, leads });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}