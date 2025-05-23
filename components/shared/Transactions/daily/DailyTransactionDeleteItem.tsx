"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteTransaction } from "@/lib/actions/transaction-actions";
import { currencyFormatter, renderTransactionType } from "@/lib/utils";
import { Transactions } from "@/types";
import { Loader, Trash2 } from "lucide-react";
import moment from "moment";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const DailyTransactionDeleteItem = ({
  transaction,
  refetchDailyTransactions,
}: {
  transaction: Transactions;
  refetchDailyTransactions: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteTransaction = () => {
    startTransition(async () => {
      const response = await deleteTransaction(transaction.id);

      if (response) {
        await refetchDailyTransactions();
        setOpenDialog(false);
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Trash2 className="cursor-pointer text-red-700" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle className="font-bold text-red-700">
            Delete Transaction
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mb-3">
            Are you sure you want to delete this transaction?
          </DialogDescription>
          <div className="text-sm mb-2">
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Date: </p>
              <p className="col-span-3">
                {moment(transaction.date).format("MMMM DD, YYYY")}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Note: </p>
              <p className="col-span-3">{transaction.note}</p>
            </div>
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Location: </p>
              <p className="col-span-3">{transaction.location}</p>
            </div>
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Amount: </p>
              <p className="col-span-3">
                {currencyFormatter.format(transaction.amount)}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Account: </p>
              <p className="col-span-3">
                {transaction.transactionAccount?.name}
              </p>
            </div>
            <div className="grid grid-cols-4">
              <p className="font-bold col-span-1">Type: </p>
              <p
                className={`col-span-3 ${renderTransactionType(
                  transaction.type
                )}`}
              >
                {transaction.type === "expense" ? "Expense" : "Income"}
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full bg-red-700 hover:bg-red-600 text-white cursor-pointer"
            onClick={handleDeleteTransaction}
          >
            {isPending ? <Loader className="animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DailyTransactionDeleteItem;
