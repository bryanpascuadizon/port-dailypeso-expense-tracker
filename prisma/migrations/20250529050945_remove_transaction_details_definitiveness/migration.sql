-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "details" DROP NOT NULL,
ALTER COLUMN "details" DROP DEFAULT;
