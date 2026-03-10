-- Add commission to leads
ALTER TABLE "leads" ADD COLUMN "commission" INTEGER;

-- Announcements
CREATE TABLE "announcements" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "announcements_isActive_updatedAt_idx" ON "announcements"("isActive", "updatedAt");

-- Announcement commissions
CREATE TABLE "announcement_commissions" (
    "id" TEXT NOT NULL,
    "annId" TEXT NOT NULL,
    "tgUserId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "announcement_commissions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "announcement_commissions_annId_tgUserId_key" ON "announcement_commissions"("annId", "tgUserId");
CREATE INDEX "announcement_commissions_annId_idx" ON "announcement_commissions"("annId");

ALTER TABLE "announcement_commissions" ADD CONSTRAINT "announcement_commissions_annId_fkey"
    FOREIGN KEY ("annId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Telegram messages mapping
CREATE TABLE "telegram_messages" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "leadId" INTEGER,
    "annId" TEXT,
    "chatId" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "telegram_messages_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "telegram_messages_kind_idx" ON "telegram_messages"("kind");
CREATE INDEX "telegram_messages_leadId_idx" ON "telegram_messages"("leadId");
CREATE INDEX "telegram_messages_annId_idx" ON "telegram_messages"("annId");
CREATE UNIQUE INDEX "telegram_messages_chatId_messageId_key" ON "telegram_messages"("chatId", "messageId");

ALTER TABLE "telegram_messages" ADD CONSTRAINT "telegram_messages_leadId_fkey"
    FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "telegram_messages" ADD CONSTRAINT "telegram_messages_annId_fkey"
    FOREIGN KEY ("annId") REFERENCES "announcements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Pending inputs
CREATE TABLE "pending_inputs" (
    "id" TEXT NOT NULL,
    "tgUserId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pending_inputs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "pending_inputs_tgUserId_key" ON "pending_inputs"("tgUserId");