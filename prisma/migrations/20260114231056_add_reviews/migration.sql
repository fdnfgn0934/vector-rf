-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "text" TEXT NOT NULL,
    "city" TEXT,
    "source" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "reviews_isPublic_createdAt_idx" ON "reviews"("isPublic", "createdAt");
