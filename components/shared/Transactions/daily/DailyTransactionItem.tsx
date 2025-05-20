import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";

const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  console.log();
  return (
    <div className="grid grid-cols-2 px-5 text-xs md:text-sm mb-3">
      <div className="flex-start gap-3">
        <div>
          <p className="font-bold">{transaction.note}</p>
          <p className="text-xs">{transaction.transactionAccount.name}</p>
        </div>
      </div>
      <div className="flex-end">
        <p
          className={`text-sm md:text-base ${renderTransactionType(
            transaction.type
          )}`}
        >
          {currencyFormatter.format(transaction.amount)}
        </p>
      </div>
    </div>
  );
};

export default DailyTransactionItem;
