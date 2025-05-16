import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";

const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  return (
    <div className="grid grid-cols-2 px-5 text-xs md:text-sm mb-3">
      <div className="flex-start gap-3">
        <div>
          <p className="font-bold">{transaction.transactionNote}</p>
          <p className="text-xs">{transaction.account}</p>
        </div>
      </div>
      <div className="flex-end">
        <p
          className={`text-sm md:text-base ${renderTransactionType(
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
