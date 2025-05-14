import { Transactions } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = new Intl.NumberFormat("en-PH", {
  currency: "PHP",
  style: "currency",
  minimumFractionDigits: 2,
});

export const computeTotalAmount = (transactions: Transactions[]) => {
  const totalAmount = transactions.reduce(
    (acc, transaction: Transactions) => acc + transaction.transactionAmount,
    0
  );

  return totalAmount;
};

export const renderTransactionType = (type: string) => {
  return `${type === "expense" ? "text-red-700" : "text-blue-700"}`;
};

export const getMonthlyAccordions = (): string[] => {
  const currentDateIndex = new Date().getMonth();
  const monthyAccordions = [];

  for (let i = currentDateIndex; i >= 0; i--) {
    let month = moment().month(i).format("MMMM");

    monthyAccordions.push(month);
  }

  return monthyAccordions;
};
