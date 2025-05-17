"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserAccounts } from "@/lib/actions/account-actions";
import { submitDailyTransaction } from "@/lib/actions/transaction-actions";
import { cn, currencyFormatter } from "@/lib/utils";
import { Accounts } from "@/types";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, PlusIcon } from "lucide-react";
import moment from "moment";
import { useActionState, useEffect, useState } from "react";

const DailyTransactionDrawer = () => {
  const { data } = useQuery({
    queryKey: ["user-accounts"],
    queryFn: getUserAccounts,
  });

  const [date, setDate] = useState<Date>();
  const [account, setAccount] = useState<string>("");
  const [transactionType, setTransactionType] = useState<string | undefined>(
    "income"
  );

  const [state, action] = useActionState(submitDailyTransaction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <Drawer>
      {data && data.accounts && (
        <DrawerTrigger className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 w-13 h-13 md:w-15 md:h-15 flex items-center justify-center">
          <PlusIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
        </DrawerTrigger>
      )}

      <DrawerContent className="wrapper">
        <DrawerHeader>
          <DrawerTitle className="text-base md:text-lg">
            Add Transaction
          </DrawerTitle>
          <DrawerDescription className="text-sm">
            {moment(date).format("MMM DD, YYYY")}
          </DrawerDescription>
        </DrawerHeader>
        <form action={action} className="p-5">
          <Label className="daily-form-item">Note</Label>
          <Input id="note" name="note" className="daily-form-item" required />
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-1">
              <Label className="daily-form-item">Date</Label>
              <Popover>
                <PopoverTrigger asChild id="date" name="date">
                  <Button
                    variant={"outline"}
                    className={cn(
                      "daily-form-item justify-start text-left font-normal w-full",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input
                type="hidden"
                name="date"
                value={moment(date).format("MMM DD, YYYY")}
              />
              <Label className="daily-form-item">Amount</Label>
              <Input
                id="amount"
                name="amount"
                placeholder={`${currencyFormatter.format(0)}`}
                type="number"
                className="daily-form-item"
                required
              />
            </div>
            <div className="col-span-1">
              <Label className="daily-form-item">Account</Label>
              <Select value={account} onValueChange={setAccount}>
                <SelectTrigger
                  id="account"
                  className="w-full daily-form-item"
                ></SelectTrigger>
                <SelectContent>
                  {data &&
                    data.accounts &&
                    data.accounts.map((account: Accounts) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <input required type="hidden" name="account" value={account} />
              <Label className="daily-form-item">Income/Expense</Label>
              <Select
                defaultValue={transactionType}
                onValueChange={setTransactionType}
                value={transactionType}
              >
                <SelectTrigger
                  id="type"
                  className={`w-full daily-form-item ${
                    transactionType === "income"
                      ? "income-text border-1 border-green-700"
                      : "expense-text border-1 border-red-700"
                  }`}
                >
                  <SelectValue placeholder="Income/Expense" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income" className="income-text">
                    Income
                  </SelectItem>
                  <SelectItem value="expense" className="expense-text">
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
              <input
                required
                type="hidden"
                name="type"
                value={transactionType}
              />
            </div>
          </div>

          <Button
            disabled={!account}
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 cursor-pointer"
          >
            Add
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DailyTransactionDrawer;
