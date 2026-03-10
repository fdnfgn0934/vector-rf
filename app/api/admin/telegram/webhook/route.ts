import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const WEBHOOK_URL =
  process.env.TELEGRAM_WEBHOOK_URL ||
  "https://vector-rf.ru/api/telegram/webhook";

async function tg(method: string, body?: any) {
  const res = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/${method}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body || {}),
    }
  );

  return res.json();
}

export async function GET() {
  const data = await tg("getWebhookInfo");
  return NextResponse.json(data);
}

export async function POST() {
  const data = await tg("setWebhook", {
    url: WEBHOOK_URL,
    allowed_updates: ["callback_query", "message"],
    drop_pending_updates: true,
  });

  return NextResponse.json(data);
}

export async function DELETE() {
  const data = await tg("deleteWebhook", {
    drop_pending_updates: true,
  });

  return NextResponse.json(data);
}