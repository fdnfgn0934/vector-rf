-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "repliedAt" TIMESTAMP(3),
ADD COLUMN     "replyAuthor" TEXT,
ADD COLUMN     "replyText" TEXT;
