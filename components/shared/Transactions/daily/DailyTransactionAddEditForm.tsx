"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { inputMaxLength } from "@/lib/constants";
import { cn, currencyFormatter } from "@/lib/utils";
import { TransactionAccount, Transactions } from "@/types";
import { CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns";
import { useActionState, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  submitDailyTransaction,
  editTransaction,
} from "@/lib/actions/transaction-actions";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface DailyTransactionAddEditItem {
  transaction?: Transactions;
  userAccounts: TransactionAccount[];
  toEdit?: boolean;
  setOpenDialog: (isOpen: boolean) => void;
}

const DailyTransactionAddEditForm = ({
  transaction,
  userAccounts,
  toEdit,
  setOpenDialog,
}: DailyTransactionAddEditItem) => {
  //If a user account is existing, set as a default value for account selection
  const defaultAccount = useMemo(
    () =>
      transaction?.transactionAccountId
        ? transaction.transactionAccountId
        : userAccounts[0].id ?? "",
    [userAccounts, transaction]
  );

  const [transactionDate, setTransactionDate] = useState<Date | undefined>(
    new Date()
  );
  const [transactionAccount, setTransactionAccount] = useState(defaultAccount);
  const [transactionType, setTransactionType] = useState("expense");
  const queryClient = useQueryClient();

  const [state, action, isPending] = useActionState(
    toEdit ? editTransaction : submitDailyTransaction,
    {
      success: false,
      message: "",
    }
  );

  //Set default state values
  useEffect(() => {
    setTransactionDate(transaction?.date ?? new Date());
    setTransactionType(transaction?.type ?? "expense");
  }, [transaction, transactionType]);

  useEffect(() => {
    if (!state.success) return;

    const handleSuccess = async () => {
      setOpenDialog(false);
      toast(
        <p className="toast-text text-confirm">
          Transaction {`${toEdit ? "updated" : "created"} `} successfully
        </p>
      );

      await queryClient.invalidateQueries({
        queryKey: ["user-daily-transactions"],
      });
    };

    handleSuccess();
  }, [state.success, setOpenDialog, queryClient, toEdit]);

  useEffect(() => {
    if (!transactionAccount && defaultAccount) {
      setTransactionAccount(defaultAccount);
    }
  }, [defaultAccount, transactionAccount]);

  return (
    <div>
      <form className="space-y-4" action={action}>
        {transaction && (
          <>
            <input type="hidden" name="id" value={transaction.id} />
            <input type="hidden" name="userId" value={transaction.userId} />
          </>
        )}
        <input
          type="hidden"
          name="date"
          value={moment(transactionDate).format("MMM DD, YYYY")}
        />
        <input type="hidden" name="account" value={transactionAccount ?? ""} />
        <input type="hidden" name="type" value={transactionType} />

        {/* Transaction Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "daily-form-item justify-start text-left font-normal w-full",
                !transactionDate && "text-muted-foreground"
              )}
            >
              {" "}
              <CalendarIcon className="mr-2 h-4 w-4" />
              {transactionDate ? format(transactionDate, "PP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={transactionDate}
              onSelect={(date) => date && setTransactionDate(date)}
              defaultMonth={transactionDate}
            />
          </PopoverContent>
        </Popover>

        {/* Tranasaction Note */}
        <Input
          id="note"
          name="note"
          placeholder="Note"
          className="daily-form-item"
          maxLength={inputMaxLength}
          defaultValue={transaction?.note ?? ""}
          required
        />

        {/* Transaction Details */}
        <Input
          id="details"
          name="details"
          placeholder="Note details"
          className="daily-form-item"
          maxLength={inputMaxLength}
          defaultValue={transaction?.details ?? ""}
          required
        />

        {/* Tranasction Amount */}
        <Input
          id="amount"
          name="amount"
          type="number"
          placeholder={currencyFormatter.format(0)}
          step="0.01"
          defaultValue={transaction?.amount ?? ""}
          required
        />

        {/* Transaction Account */}
        <Select
          value={transactionAccount}
          onValueChange={setTransactionAccount}
          defaultValue={transaction?.transactionAccountId ?? ""}
        >
          <SelectTrigger className="w-full daily-form-item">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {userAccounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                {account.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Transaction Type */}
        <Select
          value={transactionType}
          onValueChange={setTransactionType}
          defaultValue={transaction?.type ?? transactionType}
        >
          <SelectTrigger
            className={cn(
              "w-full daily-form-item",
              transactionType === "income"
                ? "income-text border-green-700"
                : "expense-text border-red-700"
            )}
          >
            <SelectValue placeholder="Income/Expense" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="expense" className="expense-text">
              Expense
            </SelectItem>
            <SelectItem value="income" className="income-text">
              Income
            </SelectItem>
          </SelectContent>
        </Select>

        <Button
          type="submit"
          className={`w-full text-white cursor-pointer ${
            toEdit
              ? "bg-green-700 hover:bg-green-600 "
              : "bg-yellow-500 hover:bg-yellow-400 "
          }`}
          disabled={isPending}
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            `${toEdit ? "Update" : "Create"}`
          )}
        </Button>
      </form>
    </div>
  );
};

export default DailyTransactionAddEditForm;
