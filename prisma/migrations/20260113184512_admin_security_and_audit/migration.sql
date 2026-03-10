-- CreateTable
CREATE TABLE "admin_login_attempts" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "firstAttempt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blockedUntil" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_login_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" SERIAL NOT NULL,
    "actorId" INTEGER,
    "actorEmail" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT,
    "entityId" INTEGER,
    "details" JSONB,
    "ip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_login_attempts_key_key" ON "admin_login_attempts"("key");

-- CreateIndex
CREATE INDEX "audit_log_action_createdAt_idx" ON "audit_log"("action", "createdAt");

-- CreateIndex
CREATE INDEX "audit_log_entity_entityId_idx" ON "audit_log"("entity", "entityId");
