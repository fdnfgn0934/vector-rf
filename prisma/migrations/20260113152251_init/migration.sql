-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'DISPATCHER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'DISPATCHER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "fromText" TEXT NOT NULL,
    "toText" TEXT NOT NULL,
    "pickupAddress" TEXT,
    "dropoffAddress" TEXT,
    "datetime" TEXT,
    "carClass" TEXT NOT NULL,
    "roundTrip" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER,
    "comment" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "assignedToId" INTEGER,
    "isDuplicate" BOOLEAN NOT NULL DEFAULT false,
    "duplicateOfId" INTEGER,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" SERIAL NOT NULL,
    "brandName" TEXT NOT NULL DEFAULT 'Вектор РФ',
    "brandTagline" TEXT NOT NULL DEFAULT 'трансферы и поездки по России',
    "phone" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "email" TEXT,
    "workHours" TEXT,
    "regionNote" TEXT,
    "companyName" TEXT,
    "inn" TEXT,
    "ogrn" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "leads_status_createdAt_idx" ON "leads"("status", "createdAt");

-- CreateIndex
CREATE INDEX "leads_assignedToId_idx" ON "leads"("assignedToId");

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
