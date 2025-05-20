-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_transactionAccountId_fkey" FOREIGN KEY ("transactionAccountId") REFERENCES "TransactionAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
