import { NextResponse } from "next/server";
import { requireAdminOrThrow } from "@/lib/admin-api";
import { sendTelegramText } from "@/lib/telegram";

export const runtime = "nodejs"; // важно для стабильной работы с fetch на Vercel

export async function POST() {
  try {
    await requireAdminOrThrow();

    // Берём первый чат из TELEGRAM_CHAT_IDS или fallback TELEGRAM_CHAT_ID
    const ids = (process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID || "").trim();
    const chatId = ids
      .replace(/^\[/, "")
      .replace(/\]$/, "")
      .replaceAll('"', "")
      .replaceAll("'", "")
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)[0];

    if (!chatId) {
      return NextResponse.json({ ok: false, error: "Missing TELEGRAM_CHAT_IDS or TELEGRAM_CHAT_ID" }, { status: 500 });
    }

    const keyboard = {
      inline_keyboard: [
        [{ text: "✅ Кнопка 1", callback_data: "TEST:1" }],
        [{ text: "✅ Кнопка 2", callback_data: "TEST:2" }],
      ],
    };

    const r = await sendTelegramText(chatId, "<b>Тест кнопок</b>\nЕсли видишь кнопки — всё ок ✅", keyboard);

    return NextResponse.json({ ok: true, result: r });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}

// чтобы GET не давал 405 “в никуда” — можно вернуть подсказку
export async function GET() {
  return NextResponse.json({ ok: true, hint: "Use POST" });
}