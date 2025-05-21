import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { PenLine, Trash2 } from "lucide-react";

import { useState } from "react";
const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
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
            <p className="font-bold">{transaction.note}</p>
            <p className="text-xs">{transaction.transactionAccount.name}</p>
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
          <PenLine className="cursor-pointer text-green-700" />
          <Trash2 className="cursor-pointer text-red-700" />
        </div>
      )}
    </div>
  );
};

export default DailyTransactionItem;
