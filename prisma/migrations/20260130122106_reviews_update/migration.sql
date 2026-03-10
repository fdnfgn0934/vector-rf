/*
  Warnings:

  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "rating" DROP DEFAULT;
