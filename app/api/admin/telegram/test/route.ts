import { NextResponse } from "next/server";
import { requireAdminOrThrow } from "@/lib/admin-api";
import { sendTelegramToAll } from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST() {
  try {
    await requireAdminOrThrow();

    const r = await sendTelegramToAll("<b>Тест</b>: Telegram уведомления работают ✅");

    return NextResponse.json({ ok: true, result: r });
  } catch (e: any) {
    const status = e?.message === "UNAUTHORIZED" ? 401 : 500;
    return NextResponse.json({ ok: false, error: e?.message || "server error" }, { status });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: "Use POST" });
}