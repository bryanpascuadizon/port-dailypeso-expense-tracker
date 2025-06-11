"use client";

import { AccordionContent } from "@/components/ui/accordion";
import { Transactions } from "@/types";
import DailyTransactionItem from "./DailyTransactionItem";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

interface DailyTranasctionAccordionContentProp {
  transactions: Transactions[];
  refetchDailyTransactions: () => void;
}

const DailyTransactionAccordionContent = ({
  transactions,
  refetchDailyTransactions,
}: DailyTranasctionAccordionContentProp) => {
  const sortOptions = ["account", "amount", "note", "note details"];

  const [sortBy, setSortBy] = useState(sortOptions[0]);
  const [sortedTransactions, setSortedTransactions] =
    useState<Transactions[]>();

  const sortTransactions = (
    sort: string,
    transactionsForSorting: Transactions[]
  ) => {
    return [...transactionsForSorting].sort((current, next) => {
      let currentTranasaction: string = "";
      let nextTransaction: string = "";

      switch (sort) {
        case "amount":
          return (current.amount ?? 0) - (next.amount ?? 0);
        case "account":
          currentTranasaction =
            current.transactionAccount?.name.toLowerCase() ?? "";
          nextTransaction = next.transactionAccount?.name.toLowerCase() ?? "";
          break;
        case "note":
          currentTranasaction = current.note.toLowerCase() ?? "";
          nextTransaction = next.note.toLowerCase() ?? "";
          break;
        case "note details":
          currentTranasaction = current.details.toLowerCase() ?? "";
          nextTransaction = next.details.toLowerCase() ?? "";
          break;

        default:
          return 0;
      }

      if (currentTranasaction > nextTransaction) return 1;
      if (currentTranasaction < nextTransaction) return -1;

      return 0;
    });
  };

  useEffect(() => {
    setSortedTransactions(sortTransactions(sortBy, transactions));
  }, [transactions, sortBy]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    if (!sortedTransactions) return;

    setSortedTransactions(sortTransactions(sort, sortedTransactions));
  };

  return (
    <AccordionContent>
      <div className="flex justify-end items-center gap-2">
        <p className="mt-[-10px]]">Sort by:</p>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="bg-white mb-2 shadow min-w-[130px] cursor-pointer text-xs md:text-sm h-full">
            <SelectValue placeholder="sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((option: string, index) => (
                <SelectItem
                  value={option}
                  key={index}
                  className="cursor-pointer text-center text-xs md:text-sm"
                >
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {sortedTransactions &&
        sortedTransactions.map((transaction: Transactions, index) => (
          <DailyTransactionItem
            transaction={transaction}
            key={index}
            refetchDailyTransactions={refetchDailyTransactions}
          />
        ))}
    </AccordionContent>
  );
};

export default DailyTransactionAccordionContent;
