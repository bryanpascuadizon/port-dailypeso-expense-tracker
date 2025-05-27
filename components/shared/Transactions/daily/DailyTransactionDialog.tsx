"use client";

import { useActionState, useCallback, useEffect, useState } from "react";
import moment from "moment";
import { format } from "date-fns";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader, PlusIcon } from "lucide-react";
import { cn, currencyFormatter } from "@/lib/utils";
import { submitDailyTransaction } from "@/lib/actions/transaction-actions";
import useAccounts from "@/lib/hooks/useAccounts";
import { TransactionAccount } from "@/types";

const DailyTransactionDialog = () => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState<Date>(new Date());
  const [account, setAccount] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

  const { userAccounts } = useAccounts();
  const [state, action, isPending] = useActionState(submitDailyTransaction, {
    success: false,
    message: "",
  });

  const resetForm = useCallback(() => {
    setDate(new Date());
    setTransactionType("expense");
    setAccount(userAccounts?.accounts?.[0]?.id ?? "");
  }, [userAccounts]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpenDialog(isOpen);
    if (!isOpen) resetForm();
  };

  useEffect(() => {
    if (userAccounts?.accounts?.length) {
      setAccount(userAccounts.accounts[0].id);
    }
  }, [userAccounts]);

  useEffect(() => {
    if (!state.success) return;

    const closeAndReset = async () => {
      state.success = false;
      resetForm();
      setOpenDialog(false);
      toast(<p className="toast-text">Transaction added successfully</p>);
      await queryClient.invalidateQueries({
        queryKey: ["user-daily-transactions"],
      });
    };

    closeAndReset();
  }, [state, state.success, queryClient, resetForm, setOpenDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={handleDialogChange}>
      {userAccounts?.accounts && (
        <DialogTrigger
          aria-label="Add Transaction"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 w-13 h-13 md:w-15 md:h-15 flex items-center justify-center"
        >
          <PlusIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base md:text-lg font-bold">
            Add Transaction
          </DialogTitle>
          <DialogDescription className="text-base">
            {moment(date).format("MMM DD, YYYY")}
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-4">
          {/* Date Picker */}
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
          <input
            type="hidden"
            name="date"
            value={moment(date).format("MMM DD, YYYY")}
          />

          {/* Account Selector */}
          <Select value={account} onValueChange={setAccount}>
            <SelectTrigger id="account" className="w-full daily-form-item">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {userAccounts?.accounts?.map((acc: TransactionAccount) => (
                <SelectItem key={acc.id} value={acc.id}>
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <input type="hidden" name="account" value={account} required />

          {/* Type Selector */}
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
          <input type="hidden" name="type" value={transactionType} required />

          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
            disabled={account === "" || isPending}
          >
            {isPending ? (
              <Loader className="animate-spin" />
            ) : (
              "Add Transaction"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DailyTransactionDialog;
