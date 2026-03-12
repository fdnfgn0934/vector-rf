import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request-ip";
import { sendLeadToTelegram } from "@/lib/telegram";

type LeadPayload = Record<string, unknown>;

function getCookieValue(cookieHeader: string | null, key: string) {
  if (!cookieHeader) return null;

  const parts = cookieHeader.split(";").map((v) => v.trim());
  const found = parts.find((item) => item.startsWith(`${key}=`));

  if (!found) return null;

  return decodeURIComponent(found.split("=")[1] ?? "");
}

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function asNullableString(value: unknown) {
  const v = asTrimmedString(value);
  return v ? v : null;
}

function asBoolean(value: unknown) {
  return value === true;
}

function normalizePhone(input: string) {
  // Убираем всё кроме цифр и ведущего +
  const hasPlus = (input ?? "").trim().startsWith("+");
  const digits = (input ?? "").replace(/\D/g, "");

  if (!digits) return input?.trim() ?? "";

  // Нормализуем российские номера
  if (digits.startsWith("8") && digits.length === 11) return `+7${digits.slice(1)}`;
  if (digits.startsWith("7") && digits.length === 11) return `+7${digits.slice(1)}`;

  return hasPlus ? `+${digits}` : digits;
}

function normalizeCarClass(value: unknown) {
  const v = asTrimmedString(value).toLowerCase();

  if (v === "comfort" || v === "business" || v === "minivan") {
    return v;
  }

  return "standard";
}

function normalizeRouteType(value: unknown) {
  const v = asTrimmedString(value).toLowerCase();

  if (v === "city" || v === "airport" || v === "intercity") {
    return v;
  }

  return null;
}

function parsePrice(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.round(value));
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.-]/g, "").trim();
    if (!cleaned) return null;

    const parsed = Number(cleaned);
    if (!Number.isFinite(parsed)) return null;

    return Math.max(0, Math.round(parsed));
  }

  return null;
}

function buildComment(params: {
  comment: string | null;
  datetime: string | null;
  routeType: string | null;
  distanceKm: string | null;
}) {
  const parts: string[] = [];

  if (params.comment) {
    parts.push(params.comment);
  }

  if (params.datetime) {
    parts.push(`Дата/время: ${params.datetime}`);
  }

  if (params.routeType === "airport") {
    parts.push("Тип поездки: аэропорт");
  } else if (params.routeType === "intercity") {
    parts.push("Тип поездки: межгород");
  } else if (params.routeType === "city") {
    parts.push("Тип поездки: город");
  }

  if (params.distanceKm) {
    parts.push(`Ориентир по расстоянию: ${params.distanceKm} км`);
  }

  return parts.length ? parts.join("\n\n") : null;
}

export async function POST(req: Request) {
  try {
    // ── Rate limit: 5 заявок с одного IP за 3 минуты ──────────────────────
    const ip = await getRequestIp();
    const rl = await checkRateLimit(`leads:${ip}`, { limit: 5, windowMs: 3 * 60 * 1000 });
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Слишком много заявок. Попробуйте через несколько минут." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Limit": "5",
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }
    // ─────────────────────────────────────────────────────────────────────

    const body = (await req.json().catch(() => null)) as LeadPayload | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные заявки" },
        { status: 400 }
      );
    }

    const company = asTrimmedString(body.company);

    if (company) {
      return NextResponse.json({ ok: true });
    }

    const name = asTrimmedString(body.name);
    const phone = normalizePhone(asTrimmedString(body.phone));

    const from =
      asTrimmedString(body.from) || asTrimmedString(body.fromText);

    const to =
      asTrimmedString(body.to) || asTrimmedString(body.toText);

    const datetime = asNullableString(body.datetime);
    const comment = asNullableString(body.comment);
    const carClass = normalizeCarClass(body.carClass);
    const roundTrip = asBoolean(body.roundTrip);
    const routeType = normalizeRouteType(body.routeType);
    const distanceKm = asNullableString(body.distanceKm);

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Укажите корректное имя" },
        { status: 400 }
      );
    }

    if (phone.length < 6 || phone.length > 30) {
      return NextResponse.json(
        { ok: false, error: "Укажите корректный телефон" },
        { status: 400 }
      );
    }

    if (!from || from.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Укажите адрес отправления" },
        { status: 400 }
      );
    }

    if (!to || to.length > 200) {
      return NextResponse.json(
        { ok: false, error: "Укажите адрес назначения" },
        { status: 400 }
      );
    }

    const cookieHeader = req.headers.get("cookie");

    const utmSource =
      asNullableString(body.utmSource) ??
      getCookieValue(cookieHeader, "vrf_utm_source");

    const utmMedium =
      asNullableString(body.utmMedium) ??
      getCookieValue(cookieHeader, "vrf_utm_medium");

    const utmCampaign =
      asNullableString(body.utmCampaign) ??
      getCookieValue(cookieHeader, "vrf_utm_campaign");

    const price = parsePrice(body.price);

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        fromText: from,
        toText: to,
        pickupAddress: from,
        dropoffAddress: to,
        datetime,
        carClass,
        roundTrip,
        price,
        priceIsManual: false,
        comment: buildComment({
          comment,
          datetime,
          routeType,
          distanceKm,
        }),
        utmSource,
        utmMedium,
        utmCampaign,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        fromText: true,
        toText: true,
        datetime: true,
        carClass: true,
        roundTrip: true,
        comment: true,
        price: true,
        priceIsManual: true,
        commission: true,
        status: true,
        isDuplicate: true,
      },
    });

    try {
      await sendLeadToTelegram(lead);
    } catch (telegramError) {
      console.error("Telegram notify error:", telegramError);
    }

    return NextResponse.json({
      ok: true,
      id: lead.id,
      lead: {
        id: lead.id,
        isDuplicate: lead.isDuplicate,
      },
    });
  } catch (error) {
    console.error("Lead create error:", error);

    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}
