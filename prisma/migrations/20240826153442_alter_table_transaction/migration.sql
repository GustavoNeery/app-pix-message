/*
  Warnings:

  - You are about to drop the column `interationId` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interation" ALTER COLUMN "id" SET DEFAULT substring(md5(random()::text), 1, 12);

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "interationId";
