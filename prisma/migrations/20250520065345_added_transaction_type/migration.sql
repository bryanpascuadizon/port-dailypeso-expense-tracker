-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "type" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "note" SET DEFAULT '';
