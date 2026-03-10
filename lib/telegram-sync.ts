// lib/telegram-sync.ts
import { prisma } from "@/lib/prisma";
import { deleteTelegramMessage, editTelegramMessage } from "@/lib/telegram";

export type TgInlineKeyboardMarkup = {
  inline_keyboard: Array<Array<{ text: string; callback_data?: string; url?: string }>>;
};

export async function deleteLeadMessagesEverywhere(leadId: number) {
  const msgs = await prisma.telegramMessage.findMany({
    where: {
      kind: "lead",
      leadId: leadId,
    },
    select: { chatId: true, messageId: true },
  });

  for (const m of msgs) {
    try {
      await deleteTelegramMessage(m.chatId, m.messageId);
    } catch {
      // сообщение уже удалено / нет прав / устарело — игнор
    }
  }

  await prisma.telegramMessage.deleteMany({
    where: {
      kind: "lead",
      leadId: leadId,
    },
  });
}

export async function editLeadMessagesEverywhere(
  leadId: number,
  text: string,
  replyMarkup?: TgInlineKeyboardMarkup
) {
  const msgs = await prisma.telegramMessage.findMany({
    where: {
      kind: "lead",
      leadId: leadId,
    },
    select: { chatId: true, messageId: true },
  });

  for (const m of msgs) {
    try {
      await editTelegramMessage(m.chatId, m.messageId, text, replyMarkup);
    } catch {
      // игнор
    }
  }
}