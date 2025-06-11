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
  const sortOptions = ["accounts", "note", "note details", "amount"];

  const [sortBy, setSortBy] = useState("accounts");
  const [sortedTransactions, setSortedTransactions] =
    useState<Transactions[]>();

  useEffect(() => {
    setSortedTransactions(transactions);
  }, [transactions]);

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    if (!sortedTransactions) return;

    const tempSortedTransactions = sortedTransactions.sort((current, next) => {
      let currentTranasaction: string = "";
      let nextTransaction: string = "";

      switch (sort) {
        case "amount":
          return current.amount ?? 0 - next.amount ?? 0;
        case "note":
          currentTranasaction = current.note.toLowerCase() ?? "";
          nextTransaction = next.note.toLowerCase() ?? "";
          break;
        case "note details":
          currentTranasaction = current.details.toLowerCase() ?? "";
          nextTransaction = next.details.toLowerCase() ?? "";
          break;
        case "accounts":
          currentTranasaction =
            current.transactionAccount?.name.toLowerCase() ?? "";
          nextTransaction = next.transactionAccount?.name.toLowerCase() ?? "";
          break;
        default:
          return 0;
      }

      if (currentTranasaction > nextTransaction) return 1;
      if (currentTranasaction < nextTransaction) return -1;

      return 0;
    });

    setSortedTransactions(tempSortedTransactions);
  };

  return (
    <AccordionContent>
      <div className="flex justify-end">
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="bg-white mb-2 shadow">
            <SelectValue placeholder="sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortOptions.map((option: string, index) => (
                <SelectItem value={option} key={index}>
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
