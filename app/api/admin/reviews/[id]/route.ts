import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-api";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

function toStr(v: any) {
  const s = String(v ?? "").trim();
  return s.length ? s : null;
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const reviewId = Number(id);

  if (!Number.isFinite(reviewId)) {
    return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));

  const data: any = {};

  // ✅ публикация/скрытие как было
  if (typeof body.isPublic === "boolean") data.isPublic = body.isPublic;

  // ✅ ответ на отзыв из админки
  // body.replyText: string | null
  // body.replyAuthor: string | null (необязательно)
  if ("replyText" in body || "replyAuthor" in body) {
    const replyText = toStr(body.replyText);
    const replyAuthor = toStr(body.replyAuthor);

    if (replyText) {
      // ставим ответ
      data.replyText = replyText;
      data.replyAuthor = replyAuthor; // можно null
      data.repliedAt = new Date();
    } else {
      // очищаем ответ (если пусто/удалили)
      data.replyText = null;
      data.replyAuthor = null;
      data.repliedAt = null;
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ ok: false, error: "no fields to update" }, { status: 400 });
  }

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data,
    select: {
      id: true,
      isPublic: true,
      replyText: true,
      replyAuthor: true,
      repliedAt: true,
    },
  });

  // ✅ важно: обновляем страницы, где показываются отзывы
  revalidatePath("/reviews");
  revalidatePath("/");

  return NextResponse.json({ ok: true, review: updated });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const reviewId = Number(id);

  if (!Number.isFinite(reviewId)) {
    return NextResponse.json({ ok: false, error: "bad id" }, { status: 400 });
  }

  await prisma.review.delete({ where: { id: reviewId } });

  revalidatePath("/reviews");
  revalidatePath("/");

  return NextResponse.json({ ok: true });
}