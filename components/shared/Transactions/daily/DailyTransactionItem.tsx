import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";

const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  return (
    <div className="grid grid-cols-2 p-3 text-sm mb-3">
      <div className="flex-start gap-3">
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
