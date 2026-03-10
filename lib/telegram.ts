import { prisma } from "@/lib/prisma";

type TgApiResult = { ok: boolean; [k: string]: any };

function env(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function tgEnabled() {
  const enabled = (process.env.TELEGRAM_ENABLED || "true").toLowerCase();
  return !(enabled === "false" || enabled === "0");
}

/**
 * TELEGRAM_CHAT_IDS поддержка:
 * 1) 123,456
 * 2) "123","456"
 * 3) ["123","456"]
 * Также поддерживает TELEGRAM_CHAT_ID (один чат).
 */
function getChatIds(): string[] {
  const ids = env("TELEGRAM_CHAT_IDS") || env("TELEGRAM_CHAT_ID");
  if (!ids) return [];

  const cleaned = ids
    .trim()
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .replaceAll('"', "")
    .replaceAll("'", "");

  return cleaned
    .split(/[,\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function tgBase() {
  const token = env("TELEGRAM_BOT_TOKEN");
  if (!token) throw new Error("Missing TELEGRAM_BOT_TOKEN");
  return `https://api.telegram.org/bot${token}`;
}

function escHtml(s: string) {
  return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function extractLeadIdFromHtml(htmlText: string): number | null {
  const m = htmlText.match(/Заявка\s+#(\d+)/i);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

async function saveTelegramMessage(params: { kind: "lead"; leadId: number; chatId: string; messageId: number }) {
  try {
    await prisma.telegramMessage.create({
      data: {
        kind: params.kind,
        leadId: params.leadId,
        chatId: params.chatId,
        messageId: params.messageId,
      },
    });
  } catch (e) {
    console.warn("saveTelegramMessage failed:", e);
  }
}

export async function sendTelegramText(chatId: string, htmlText: string, keyboard?: any) {
  if (!tgEnabled()) return { ok: true, skipped: true as const };

  const payload: any = {
    chat_id: chatId,
    text: htmlText,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (keyboard) payload.reply_markup = keyboard;

  const res = await fetch(`${tgBase()}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as TgApiResult | null;
  if (!res.ok || !data?.ok) {
    console.error("TG sendMessage failed:", res.status, data);
    return { ok: false, status: res.status, data };
  }

  return { ok: true, data };
}

export async function sendTelegramToAll(htmlText: string, keyboard?: any) {
  if (!tgEnabled()) return { ok: true, skipped: true as const };

  const chatIds = getChatIds();
  if (!chatIds.length) {
    console.warn("Telegram: Missing TELEGRAM_CHAT_IDS (or TELEGRAM_CHAT_ID)");
    return { ok: false, error: "no chat ids" };
  }

  const leadId = extractLeadIdFromHtml(htmlText);

  const results: Array<{ chatId: string; ok: boolean; status?: number; data?: any; messageId?: number }> = [];

  for (const chatId of chatIds) {
    const r = await sendTelegramText(chatId, htmlText, keyboard);

    const messageId = (r as any)?.data?.result?.message_id ?? (r as any)?.data?.message_id ?? undefined;

    results.push({
      chatId,
      ok: !!(r as any).ok,
      status: (r as any).status,
      data: (r as any).data,
      messageId,
    });

    if ((r as any).ok && leadId && typeof messageId === "number") {
      await saveTelegramMessage({
        kind: "lead",
        leadId,
        chatId: String(chatId),
        messageId,
      });
    }
  }

  return { ok: results.every((r) => r.ok), results };
}

export async function editTelegramMessage(chatId: string, messageId: number, htmlText: string, keyboard?: any) {
  if (!tgEnabled()) return { ok: true, skipped: true as const };

  const payload: any = {
    chat_id: chatId,
    message_id: messageId,
    text: htmlText,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };
  if (keyboard) payload.reply_markup = keyboard;

  const res = await fetch(`${tgBase()}/editMessageText`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => null)) as TgApiResult | null;
  if (!res.ok || !data?.ok) {
    console.error("TG editMessageText failed:", res.status, data);
    return { ok: false, status: res.status, data };
  }
  return { ok: true, data };
}

export async function deleteTelegramMessage(chatId: string, messageId: number) {
  if (!tgEnabled()) return { ok: true, skipped: true as const };

  const res = await fetch(`${tgBase()}/deleteMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, message_id: messageId }),
  });

  const data = (await res.json().catch(() => null)) as TgApiResult | null;
  if (!res.ok || !data?.ok) {
    return { ok: false, status: res.status, data };
  }
  return { ok: true, data };
}

export async function answerCallbackQuery(callbackQueryId: string, text?: string) {
  if (!tgEnabled()) return { ok: true, skipped: true as const };

  const res = await fetch(`${tgBase()}/answerCallbackQuery`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      callback_query_id: callbackQueryId,
      text: text || undefined,
      show_alert: false,
    }),
  });

  const data = (await res.json().catch(() => null)) as TgApiResult | null;
  if (!res.ok || !data?.ok) {
    console.error("TG answerCallbackQuery failed:", res.status, data);
    return { ok: false, status: res.status, data };
  }
  return { ok: true, data };
}

export async function editLeadMessagesEverywhere(leadId: number, htmlText: string, keyboard?: any) {
  const msgs = await prisma.telegramMessage.findMany({
    where: { kind: "lead", leadId },
    select: { chatId: true, messageId: true },
  });

  for (const m of msgs) {
    await editTelegramMessage(m.chatId, m.messageId, htmlText, keyboard).catch(() => null);
  }
}

export async function deleteLeadMessagesEverywhere(leadId: number) {
  const msgs = await prisma.telegramMessage.findMany({
    where: { kind: "lead", leadId },
    select: { chatId: true, messageId: true },
  });

  for (const m of msgs) {
    await deleteTelegramMessage(m.chatId, m.messageId).catch(() => null);
  }

  await prisma.telegramMessage.deleteMany({ where: { kind: "lead", leadId } });
}

export function leadKeyboard(leadId: number) {
  return {
    inline_keyboard: [
      [
        { text: "✅ В работу", callback_data: `L:${leadId}:in_progress` },
        { text: "✅ Завершить", callback_data: `L:${leadId}:done` },
      ],
      [
        { text: "✏️ Изменить цену", callback_data: `L:${leadId}:set_price` },
        { text: "💸 Комиссия", callback_data: `L:${leadId}:set_commission` },
      ],
      [{ text: "❌ Убрать из Telegram", callback_data: `L:${leadId}:canceled` }],
    ],
  };
}

export function leadMessage(lead: {
  id: number;
  name: string;
  phone: string;
  fromText: string;
  toText: string;
  datetime?: string | null;
  carClass: string;
  roundTrip?: boolean | null;
  comment?: string | null;
  price?: number | null;
  priceIsManual?: boolean | null; // ✅ добавили
  commission?: number | null;
  status?: string | null;
}) {
  const status = lead.status || "new";

  const statusLabel =
    status === "new"
      ? "🟦 NEW"
      : status === "in_progress"
      ? "🟨 В РАБОТЕ"
      : status === "done"
      ? "🟩 ЗАВЕРШЕНО"
      : status === "canceled"
      ? "🟥 ОТМЕНЕНО"
      : `ℹ️ ${escHtml(status)}`;

  const lines: string[] = [];
  lines.push(`<b>Заявка #${lead.id}</b>  ${statusLabel}`);
  lines.push(`👤 <b>${escHtml(lead.name)}</b>`);
  lines.push(`📞 <b>${escHtml(lead.phone)}</b>`);
  lines.push(`📍 <b>${escHtml(lead.fromText)}</b> → <b>${escHtml(lead.toText)}</b>`);
  if (lead.datetime) lines.push(`🕒 ${escHtml(lead.datetime)}`);
  lines.push(`🚗 Класс: <b>${escHtml(lead.carClass)}</b>${lead.roundTrip ? " • туда-обратно" : ""}`);

  const hasPrice = typeof lead.price === "number";
  const isManual = !!lead.priceIsManual;

  // ✅ Если цена ручная — показываем только итог, авторасчёт НЕ показываем
  if (hasPrice && isManual) {
    lines.push(`💰 Итог: <b>${lead.price} ₽</b>`);
  } else if (hasPrice && !isManual) {
    // ✅ Если цена не ручная — это авторасчёт
    lines.push(`[Авторасчёт]: ${lead.price} ₽`);
  }

  if (typeof lead.commission === "number") lines.push(`💸 Комиссия: <b>${lead.commission} ₽</b>`);
  if (lead.comment) lines.push(`💬 ${escHtml(lead.comment)}`);
  return lines.join("\n");
}

export async function updateLeadStatusFromTelegram(leadId: number, status: string) {
  const allowed = new Set(["new", "in_progress", "done", "canceled"]);
  if (!allowed.has(status)) throw new Error("bad status");

  const updated = await prisma.lead.update({
    where: { id: leadId },
    data: { status },
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
      priceIsManual: true, // ✅ добавили
      commission: true,
      status: true,
    },
  });

  return updated;
}