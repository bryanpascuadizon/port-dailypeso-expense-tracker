import { Transactions } from "@/types";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { PenLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

const DailyTransactionItem = ({
  transaction,
}: {
  transaction: Transactions;
}) => {
  const handleDelete = () => {
    toast(<p>Test</p>);
  };
  return (
    <div className="grid grid-cols-2 px-5 text-xs md:text-sm mb-3">
      <div className="flex-start gap-3">
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
  );
};

export default DailyTransactionItem;
