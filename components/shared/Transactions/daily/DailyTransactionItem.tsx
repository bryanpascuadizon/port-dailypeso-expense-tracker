import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { Sun } from "lucide-react";

const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  return (
    <div className="grid grid-cols-2 rounded-sm bg-white p-3 text-sm shadow mb-3">
      <div className="flex-start gap-3">
        <Sun className="w-10 h-10 text-yellow-400" />
        <div>
          <p>{transaction.transactionNote}</p>
          <p className="text-xs">{transaction.account}</p>
        </div>
      </div>
      <div className="flex-end">
        <p
          className={`text-base ${renderTransactionType(
            transaction.transactionType
          )}`}
        >
          {currencyFormatter.format(transaction.transactionAmount)}
        </p>
      </div>
    </div>
  );
};

export default DailyTransactionItem;
