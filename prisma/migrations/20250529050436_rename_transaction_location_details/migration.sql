/*
  Warnings:

  - You are about to drop the column `location` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "location",
ADD COLUMN     "details" TEXT NOT NULL DEFAULT '';
