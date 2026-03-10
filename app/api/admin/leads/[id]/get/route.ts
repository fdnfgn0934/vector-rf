import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminOrThrow } from "@/lib/admin-api";

export async function GET(_: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminOrThrow();

    const { id } = await ctx.params;
    const leadId = Number(id);
    if (!Number.isFinite(leadId)) {
      return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        phone: true,
        fromText: true,
        toText: true,
        pickupAddress: true,
        dropoffAddress: true,
        datetime: true,
        carClass: true,
        roundTrip: true,
        price: true,
        commission: true,
        comment: true,
        status: true,
        assignedToId: true,
        assignedTo: { select: { id: true, name: true, email: true } },
        isDuplicate: true,
        duplicateOfId: true,
        utmSource: true,
        utmMedium: true,
        utmCampaign: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, lead });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}