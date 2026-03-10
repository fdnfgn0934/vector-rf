import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sendLeadToTelegram } from "@/lib/telegram";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(30),
  from: z.string().trim().min(1).max(200),
  to: z.string().trim().min(1).max(200).optional().or(z.literal("")),
  routeType: z.enum(["city", "airport", "intercity"]),
  carClass: z.enum(["standard", "comfort", "business", "minivan"]),
  comment: z.string().trim().max(1000).optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  price: z.union([z.string(), z.number()]).optional().nullable(),
  distanceKm: z.union([z.string(), z.number()]).optional().nullable(),
  roundTrip: z.boolean().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  datetime: z.string().optional().nullable(),
});

function getCookieValue(cookieHeader: string | null, key: string) {
  if (!cookieHeader) return undefined;

  const parts = cookieHeader.split(";").map((v) => v.trim());
  const found = parts.find((item) => item.startsWith(`${key}=`));

  if (!found) return undefined;

  return decodeURIComponent(found.split("=")[1] ?? "");
}

function normalizePhone(input: string) {
  const raw = (input ?? "").trim();
  if (!raw) return raw;

  if (raw.startsWith("+8")) return `+7${raw.slice(2)}`;
  if (raw.startsWith("8")) return `+7${raw.slice(1)}`;
  if (raw.startsWith("7")) return `+7${raw.slice(1)}`;

  return raw;
}

function normalizeNullableText(value?: string | null) {
  const v = (value ?? "").trim();
  return v ? v : null;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные заявки" },
        { status: 400 }
      );
    }

    const parsed = leadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Некорректные данные заявки" },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.company && data.company.trim()) {
      return NextResponse.json({ ok: true });
    }

    const cookieHeader = req.headers.get("cookie");

    const utmSource =
      normalizeNullableText(data.utmSource) ??
      getCookieValue(cookieHeader, "vrf_utm_source") ??
      null;

    const utmMedium =
      normalizeNullableText(data.utmMedium) ??
      getCookieValue(cookieHeader, "vrf_utm_medium") ??
      null;

    const utmCampaign =
      normalizeNullableText(data.utmCampaign) ??
      getCookieValue(cookieHeader, "vrf_utm_campaign") ??
      null;

    const utmTerm =
      normalizeNullableText(data.utmTerm) ??
      getCookieValue(cookieHeader, "vrf_utm_term") ??
      null;

    const utmContent =
      normalizeNullableText(data.utmContent) ??
      getCookieValue(cookieHeader, "vrf_utm_content") ??
      null;

    const commentParts = [
      normalizeNullableText(data.comment),
      normalizeNullableText(data.datetime)
        ? `Дата/время: ${data.datetime}`
        : null,
    ].filter(Boolean);

    const lead = await prisma.lead.create({
      data: {
        name: data.name.trim(),
        phone: normalizePhone(data.phone),
        from: data.from.trim(),
        to: normalizeNullableText(data.to),
        routeType: data.routeType,
        carClass: data.carClass,
        comment: commentParts.length ? commentParts.join("\n\n") : null,
        price: data.price != null ? String(data.price) : null,
        distanceKm: data.distanceKm != null ? String(data.distanceKm) : null,
        roundTrip: Boolean(data.roundTrip),
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent,
      },
    });

    try {
      await sendLeadToTelegram(lead);
    } catch (telegramError) {
      console.error("Telegram notify error:", telegramError);
    }

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (error) {
    console.error("Lead create error:", error);

    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку" },
      { status: 500 }
    );
  }
}