import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request-ip";

export const runtime = "nodejs";

// ✅ отключаем кэш для GET (чтобы новые отзывы/ответы появлялись сразу)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// 🛡 honeypot (если заполнено — молча ok)
function isHoneypotFilled(body: any) {
  return String(body?.company || "").trim().length > 0;
}

function clampInt(n: any, min: number, max: number) {
  const x = Number(n);
  if (!Number.isFinite(x)) return null;
  return Math.max(min, Math.min(max, Math.trunc(x)));
}

export async function GET() {
  try {
    const rows = await prisma.review.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      take: 200,
      select: {
        id: true,
        name: true,
        rating: true,
        text: true,
        city: true,
        createdAt: true,

        // ✅ ответы из админки
        replyText: true,
        replyAuthor: true,
        repliedAt: true,
      },
    });

    const normalized = rows.map((r) => ({
      ...r,
      rating: Number.isFinite(Number(r.rating)) ? Math.max(1, Math.min(5, Number(r.rating))) : 5,
    }));

    const res = NextResponse.json({ ok: true, reviews: normalized });

    // ✅ железобетонно запрещаем кэш
    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
  } catch (e) {
    console.error("REVIEWS GET ERROR:", e);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // ── Rate limit: 3 отзыва с одного IP за 3 минуты ──────────────────────
    const ip = await getRequestIp();
    const rl = await checkRateLimit(`reviews:${ip}`, { limit: 3, windowMs: 3 * 60 * 1000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Слишком много запросов. Попробуйте через несколько минут." },
        {
          status: 429,
          headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) },
        }
      );
    }
    // ─────────────────────────────────────────────────────────────────────

    const body = await req.json().catch(() => ({}));

    // 🛡 honeypot
    if (isHoneypotFilled(body)) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    const name = String(body?.name || "").trim();
    const text = String(body?.text || "").trim();
    const city = body?.city ? String(body.city).trim() : null;

    const ratingRaw =
      body?.rating === undefined || body?.rating === null || body?.rating === ""
        ? null
        : clampInt(body?.rating, 1, 5);
    const rating = ratingRaw ?? 5;

    if (!name || name.length < 2) {
      return NextResponse.json({ ok: false, error: "Введите имя" }, { status: 400 });
    }
    if (!text || text.length < 10) {
      return NextResponse.json({ ok: false, error: "Отзыв слишком короткий" }, { status: 400 });
    }
    if (name.length > 60 || text.length > 2000) {
      return NextResponse.json({ ok: false, error: "Слишком длинный текст" }, { status: 400 });
    }

    // Все отзывы проходят модерацию в админке перед публикацией
    const isPublic = false;

    const created = await prisma.review.create({
      data: {
        name,
        rating,
        text,
        city,
        source: "site",
        isPublic,
      },
      select: { id: true, isPublic: true },
    });

    return NextResponse.json({ ok: true, id: created.id, isPublic: created.isPublic });
  } catch (e: any) {
    console.error("REVIEWS POST ERROR:", e);
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status: 500 });
  }
}
