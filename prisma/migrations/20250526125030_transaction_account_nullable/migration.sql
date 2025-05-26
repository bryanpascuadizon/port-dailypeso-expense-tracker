-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionAccountId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "transactionAccountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionAccountId_fkey" FOREIGN KEY ("transactionAccountId") REFERENCES "TransactionAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
