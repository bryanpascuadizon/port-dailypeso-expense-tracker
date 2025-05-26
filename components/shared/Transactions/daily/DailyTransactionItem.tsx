import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { useState } from "react";
import DailyTransactionDeleteItem from "./DailyTransactionDeleteItem";
import DailyTransactionEditItem from "./DailyTransactionEditItem";
import { Banknote } from "lucide-react";

const DailyTransactionItem = ({
  transaction,
  refetchDailyTransactions,
}: {
  transaction: Transactions;
  refetchDailyTransactions: () => void;
}) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <div className="flex mx-2 text-xs md:text-sm mb-3 gap-3">
      <div
        className="flex p-1 w-full rounded-sm button-hover cursor-pointer"
        onClick={() => setShowAction(!showAction)}
      >
        <div className="flex-start w-full gap-3">
          <div>
            <p className="font-bold">
              {transaction.note} - {transaction.location}
            </p>
            {transaction.transactionAccount && (
              <div className="flex gap-1">
                <Banknote
                  className={`w-4 h-4 ${renderTransactionType(
                    transaction.type
                  )}`}
                />
                <p className="text-xs">
                  {transaction.transactionAccount?.name}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex-end gap-2">
          <p
            className={`text-sm md:text-base ${renderTransactionType(
              transaction.type
            )}`}
          >
            {currencyFormatter.format(transaction.amount)}
          </p>{" "}
        </div>
      </div>
      {showAction && (
        <div className="flex items-center gap-3">
          <DailyTransactionEditItem
            transaction={transaction}
            refetchDailyTransactions={refetchDailyTransactions}
          />
          <DailyTransactionDeleteItem
            transaction={transaction}
            refetchDailyTransactions={refetchDailyTransactions}
          />
        </div>
      )}
    </div>
  );
};

export default DailyTransactionItem;
