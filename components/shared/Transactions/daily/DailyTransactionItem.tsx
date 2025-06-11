import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { useState } from "react";
import DailyTransactionDeleteItem from "./DailyTransactionDeleteItem";
import { Banknote, NotebookText } from "lucide-react";
import DailyTransactionDialog from "./DailyTransactionDialog";

const DailyTransactionItem = ({
  transaction,
  refetchDailyTransactions,
}: {
  transaction: Transactions;
  refetchDailyTransactions: () => void;
}) => {
  const [showAction, setShowAction] = useState(false);
  return (
    <div className="flex mx-2 text-xs md:text-sm gap-3">
      <div
        className="flex p-1 w-full rounded-sm button-hover cursor-pointer"
        onClick={() => setShowAction(!showAction)}
      >
        <div className="flex-start w-full gap-3">
          <div>
            <p className="font-bold">{transaction.note}</p>
            <div className="flex gap-1">
              {transaction.transactionAccount && (
                <>
                  <Banknote
                    className={`w-4 h-4 ${renderTransactionType(
                      transaction.type
                    )}`}
                  />
                  <p className="text-xs">
                    {transaction.transactionAccount.name}
                  </p>
                </>
              )}

              {transaction.details !== "" && (
                <>
                  <NotebookText className="w-3.5 h-3.5 text-yellow-500" />
                  <p className="text-xs">{transaction.details}</p>
                </>
              )}
            </div>
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
          <DailyTransactionDialog transaction={transaction} toEdit />
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
