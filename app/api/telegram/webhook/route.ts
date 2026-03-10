import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  answerCallbackQuery,
  deleteTelegramMessage,
  editTelegramMessage,
  leadKeyboard,
  leadMessage,
  sendTelegramText,
} from "@/lib/telegram";

export const runtime = "nodejs";

function env(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function isValidSecret(req: Request) {
  const expected = env("TELEGRAM_WEBHOOK_SECRET");
  if (!expected) return true;
  const got = req.headers.get("x-telegram-bot-api-secret-token");
  return !!got && got === expected;
}

function parseMoney(text: string): number | null {
  const digits = (text || "").replace(/[^0-9]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n);
}

async function getLead(leadId: number) {
  return prisma.lead.findUnique({
    where: { id: leadId },
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
}

function shortErr(e: any) {
  const msg = String(e?.message || e || "error");
  return msg.length > 120 ? msg.slice(0, 120) + "…" : msg;
}

async function setPendingInput(tgUserId: string, kind: "lead_price" | "lead_commission", leadId: number) {
  await prisma.pendingInput.upsert({
    where: { tgUserId },
    update: { kind, entityId: String(leadId), createdAt: new Date() },
    create: { tgUserId, kind, entityId: String(leadId) },
  });
}

async function consumePendingInput(tgUserId: string) {
  const pending = await prisma.pendingInput.findUnique({ where: { tgUserId } });
  if (!pending) return null;
  await prisma.pendingInput.delete({ where: { tgUserId } }).catch(() => null);
  return pending;
}

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  if (!isValidSecret(req)) {
    return NextResponse.json({ ok: false, error: "bad secret" }, { status: 401 });
  }

  const update = await req.json().catch(() => null);
  if (!update) return NextResponse.json({ ok: true });

  // ===== 1) Inline кнопки =====
  if (update.callback_query) {
    const cq = update.callback_query;
    const cqId: string | undefined = cq.id;
    const data: string | undefined = cq.data;

    const tgUserId = String(cq?.from?.id ?? "");
    const chatId = String(cq?.message?.chat?.id ?? "");
    const msgId = Number(cq?.message?.message_id ?? 0);

    try {
      if (!data) {
        if (cqId) await answerCallbackQuery(cqId, "Ок");
        return NextResponse.json({ ok: true });
      }

      const m = data.match(/^L:(\d+):([a-z_]+)$/i);
      if (!m) {
        if (cqId) await answerCallbackQuery(cqId, "Не понял команду");
        return NextResponse.json({ ok: true });
      }

      const leadId = Number(m[1]);
      const action = String(m[2]);

      if (!Number.isFinite(leadId)) {
        if (cqId) await answerCallbackQuery(cqId, "Некорректный ID");
        return NextResponse.json({ ok: true });
      }

      // --- Статусы ---
      if (action === "in_progress" || action === "done" || action === "new") {
        // ✅ если возвращаем в NEW — логично снова считать цену авторасчётом (если она была ручной)
        const dataToUpdate =
          action === "new"
            ? ({ status: action, priceIsManual: false } as const)
            : ({ status: action } as const);

        await prisma.lead.update({ where: { id: leadId }, data: dataToUpdate });

        const lead = await getLead(leadId);

        // редактируем сообщение, где нажали
        if (lead && chatId && msgId) {
          await editTelegramMessage(chatId, msgId, leadMessage(lead), leadKeyboard(lead.id)).catch(() => null);
        }

        // и обновим везде, где есть маппинг
        const msgs = await prisma.telegramMessage.findMany({
          where: { kind: "lead", leadId },
          select: { chatId: true, messageId: true },
        });

        if (lead) {
          for (const mm of msgs) {
            await editTelegramMessage(mm.chatId, mm.messageId, leadMessage(lead), leadKeyboard(lead.id)).catch(
              () => null
            );
          }
        }

        if (cqId) await answerCallbackQuery(cqId, "Готово");
        return NextResponse.json({ ok: true });
      }

      // --- Отмена = убрать из Telegram (в БД оставить) ---
      if (action === "canceled") {
        await prisma.lead.update({ where: { id: leadId }, data: { status: "canceled" } }).catch(() => null);

        const msgs = await prisma.telegramMessage.findMany({
          where: { kind: "lead", leadId },
          select: { chatId: true, messageId: true },
        });

        for (const mm of msgs) {
          await deleteTelegramMessage(mm.chatId, mm.messageId).catch(() => null);
        }

        await prisma.telegramMessage.deleteMany({ where: { kind: "lead", leadId } });

        if (cqId) await answerCallbackQuery(cqId, "Убрано");
        return NextResponse.json({ ok: true });
      }

      // --- Цена/Комиссия: просим число и НЕ оставляем служебные сообщения ---
      const forceReply = {
        force_reply: true,
        input_field_placeholder: "Например: 40000",
        selective: false,
      };

      if (action === "set_price") {
        if (!tgUserId || !chatId) {
          if (cqId) await answerCallbackQuery(cqId, "Нет данных чата");
          return NextResponse.json({ ok: true });
        }
        await setPendingInput(tgUserId, "lead_price", leadId);

        await sendTelegramText(chatId, `Введите новую цену для заявки <b>#${leadId}</b> (только число).`, forceReply);

        if (cqId) await answerCallbackQuery(cqId, "Жду цену");
        return NextResponse.json({ ok: true });
      }

      if (action === "set_commission") {
        if (!tgUserId || !chatId) {
          if (cqId) await answerCallbackQuery(cqId, "Нет данных чата");
          return NextResponse.json({ ok: true });
        }
        await setPendingInput(tgUserId, "lead_commission", leadId);

        await sendTelegramText(chatId, `Введите комиссию для заявки <b>#${leadId}</b> (только число).`, forceReply);

        if (cqId) await answerCallbackQuery(cqId, "Жду комиссию");
        return NextResponse.json({ ok: true });
      }

      if (cqId) await answerCallbackQuery(cqId, "Неизвестное действие");
      return NextResponse.json({ ok: true });
    } catch (e: any) {
      console.error("telegram webhook callback_query error:", e);
      if (cqId) await answerCallbackQuery(cqId, `Ошибка: ${shortErr(e)}`).catch(() => null);
      return NextResponse.json({ ok: true });
    }
  }

  // ===== 2) Сообщения (ввод суммы) =====
  if (update.message) {
    const msg = update.message;
    const tgUserId = String(msg?.from?.id ?? "");
    const chatId = String(msg?.chat?.id ?? "");
    const text: string = String(msg?.text ?? "").trim();

    try {
      if (!tgUserId || !chatId) return NextResponse.json({ ok: true });
      if (text.startsWith("/")) return NextResponse.json({ ok: true });

      const pending = await consumePendingInput(tgUserId);
      if (!pending) return NextResponse.json({ ok: true });

      const amount = parseMoney(text);
      if (amount === null) {
        await prisma.pendingInput.upsert({
          where: { tgUserId },
          update: { kind: pending.kind, entityId: pending.entityId, createdAt: new Date() },
          create: { tgUserId, kind: pending.kind, entityId: pending.entityId },
        });
        return NextResponse.json({ ok: true });
      }

      const leadId = Number(pending.entityId);
      if (!Number.isFinite(leadId)) return NextResponse.json({ ok: true });

      // ✅ обновляем БД
      if (pending.kind === "lead_price") {
        // ВАЖНО: если поставили цену вручную — ставим флаг
        await prisma.lead.update({
          where: { id: leadId },
          data: { price: amount, priceIsManual: true },
        });
      } else if (pending.kind === "lead_commission") {
        await prisma.lead.update({ where: { id: leadId }, data: { commission: amount } });
      }

      // обновляем карточки в TG (где они есть)
      const lead = await getLead(leadId);
      if (lead) {
        const msgs = await prisma.telegramMessage.findMany({
          where: { kind: "lead", leadId },
          select: { chatId: true, messageId: true },
        });

        for (const mm of msgs) {
          await editTelegramMessage(mm.chatId, mm.messageId, leadMessage(lead), leadKeyboard(lead.id)).catch(
            () => null
          );
        }
      }

      // ✅ чистим чат: удаляем сообщение пользователя + "Введите ..."
      const userMsgId = Number(msg?.message_id ?? 0);
      const promptMsgId = Number(msg?.reply_to_message?.message_id ?? 0);

      if (userMsgId) await deleteTelegramMessage(chatId, userMsgId).catch(() => null);
      if (promptMsgId) await deleteTelegramMessage(chatId, promptMsgId).catch(() => null);

      return NextResponse.json({ ok: true });
    } catch (e: any) {
      console.error("telegram webhook message error:", e);
      return NextResponse.json({ ok: true });
    }
  }

  return NextResponse.json({ ok: true });
}