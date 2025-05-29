"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Loader } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, currencyFormatter } from "@/lib/utils";
import { submitDailyTransaction } from "@/lib/actions/transaction-actions";
import { TransactionAccount } from "@/types";

const DailyTransactionAddItem = ({
  userAccounts,
  setOpenDialog,
}: {
  userAccounts: TransactionAccount[];
  setOpenDialog: (isOpen: boolean) => void;
}) => {
  const [state, action, isPending] = useActionState(submitDailyTransaction, {
    success: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const [date, setDate] = useState(new Date());
  const [transactionType, setTransactionType] = useState("expense");

  const defaultAccount = useMemo(
    () => userAccounts?.[0]?.id ?? "",
    [userAccounts]
  );
  const [account, setAccount] = useState(defaultAccount);

  useEffect(() => {
    if (!account && defaultAccount) {
      setAccount(defaultAccount);
    }
  }, [defaultAccount, account]);

  const resetForm = useCallback(() => {
    setDate(new Date());
    setTransactionType("expense");
    setAccount(defaultAccount);
  }, [defaultAccount]);

  useEffect(() => {
    if (!state.success) return;

    const handleSuccess = async () => {
      resetForm();
      setOpenDialog(false);

      toast(
        <p className="toast-text text-confirm">
          Transaction added successfully
        </p>
      );

      await queryClient.invalidateQueries({
        queryKey: ["user-daily-transactions"],
      });
    };

    handleSuccess();
  }, [state.success, resetForm, setOpenDialog, queryClient]);

  return (
    <div>
      <form action={action} className="space-y-4 mt-3">
        <input type="hidden" name="date" value={format(date, "MMM dd, yyyy")} />
        <input type="hidden" name="type" value={transactionType} required />
        <input type="hidden" name="account" value={account} required />

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "daily-form-item justify-start text-left font-normal w-full",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
              defaultMonth={date}
            />
          </PopoverContent>
        </Popover>

        <Input
          id="note"
          name="note"
          placeholder="Note"
          className="daily-form-item"
          required
          maxLength={30}
        />
        <Input
          id="details"
          name="details"
          placeholder="Note details"
          className="daily-form-item"
          maxLength={30}
        />
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder={currencyFormatter.format(0)}
          className="daily-form-item"
          required
        />

        <Select value={account} onValueChange={setAccount}>
          <SelectTrigger id="account" className="w-full daily-form-item">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {userAccounts.map((acc) => (
              <SelectItem key={acc.id} value={acc.id}>
                {acc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={transactionType} onValueChange={setTransactionType}>
          <SelectTrigger
            id="type"
            className={cn(
              "w-full daily-form-item",
              transactionType === "income"
                ? "income-text border border-green-700"
                : "expense-text border border-red-700"
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
          className="w-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
          disabled={!account || isPending}
        >
          {isPending ? <Loader className="animate-spin" /> : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
};

export default DailyTransactionAddItem;
