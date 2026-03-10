import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const rows = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      name: true,
      rating: true,
      text: true,
      city: true,
      isPublic: true,
      createdAt: true,
      source: true,

      // ✅ ответы из админки
      replyText: true,
      replyAuthor: true,
      repliedAt: true,
    },
  });

  return NextResponse.json({ ok: true, reviews: rows });
}