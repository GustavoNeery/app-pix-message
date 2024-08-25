-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "interationId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Interation" (
    "id" CHAR(12) NOT NULL DEFAULT substring(md5(random()::text), 1, 12),
    "ispb" TEXT NOT NULL,
    "callCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interation_pkey" PRIMARY KEY ("id")
);
