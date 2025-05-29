"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { submitDailyTransaction } from "@/lib/actions/transaction-actions";
import { cn, currencyFormatter } from "@/lib/utils";
import { CalendarIcon, Loader } from "lucide-react";
import moment from "moment";
import { useActionState, useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionAccount } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DailyTransactionAddItem = ({
  userAccounts,
  setOpenDialog,
}: {
  userAccounts: TransactionAccount[];
  setOpenDialog: (isOpenDialog: boolean) => void;
}) => {
  const [state, action, isPending] = useActionState(submitDailyTransaction, {
    success: false,
    message: "",
  });

  const [date, setDate] = useState<Date>(new Date());
  const [account, setAccount] = useState(
    userAccounts ? userAccounts[0].id : ""
  );
  const [transactionType, setTransactionType] = useState("expense");
  const queryClient = useQueryClient();

  const resetForm = useCallback(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    if (!state.success) return;

    const closeAndReset = async () => {
      state.success = false;
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

    closeAndReset();
  }, [state, state.success, queryClient, resetForm, setOpenDialog]);

  return (
    <div>
      <form action={action} className="space-y-4 mt-3">
        <input
          type="hidden"
          name="date"
          value={moment(date).format("MMM DD, YYYY")}
        />
        <input type="hidden" name="type" value={transactionType} required />

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
              onSelect={(day) => {
                if (day) setDate(day);
              }}
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
        />

        <Input
          id="amount"
          name="amount"
          placeholder={currencyFormatter.format(0)}
          type="number"
          step="0.01"
          className="daily-form-item"
          required
        />

        <Input
          id="location"
          name="location"
          placeholder="Location"
          className="daily-form-item"
          required
        />

        <Select
          value={account ? account : userAccounts[0].id}
          onValueChange={setAccount}
        >
          <SelectTrigger id="account" className="w-full daily-form-item">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            {userAccounts.map((acc: TransactionAccount) => (
              <SelectItem key={acc.id} value={acc.id}>
                {acc.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input type="hidden" name="account" value={account} required />

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
          disabled={account === "" || isPending}
        >
          {isPending ? <Loader className="animate-spin" /> : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
};

export default DailyTransactionAddItem;
