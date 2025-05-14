import { MonthlyAccordion, Transactions, WeeklyAccordion } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment, { Moment } from "moment";

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

export const getMonthlyAccordions = (
  transactions: Transactions[],
  year: number
): MonthlyAccordion[] => {
  const yearMonths: string[] = [];
  const transactionMonths: string[] = [];

  const currentMonthIndex = new Date().getMonth();

  for (let i = 0; i <= currentMonthIndex; i++) {
    const month = moment().month(i).format("MMMM");

    yearMonths.push(month);
  }

  transactions.forEach((transaction: Transactions) => {
    const monthIndex = new Date(transaction.transactionDate).getMonth();
    const month = moment().month(monthIndex).format("MMMM");

    if (!transactionMonths.includes(month)) {
      transactionMonths.push(month);
    }
  });

  const allTransactionMonths = Array.from(
    new Set([...yearMonths, ...transactionMonths])
  ).reverse();

  //Add Transactions for each month
  const accordionPanels: MonthlyAccordion[] = allTransactionMonths.map(
    (month: string) => {
      const startDate = new Date(
        formatDateToISO(
          moment(`${month} 1, ${year}`, "MMMM D, YYYY").startOf("month")
        )
      );
      const endDate = new Date(
        formatDateToISO(
          moment(`${month} 1, ${year}`, "MMMM D, YYYY").endOf("month")
        )
      );

      const monthTransactions = transactions.filter(
        (transaction: Transactions) =>
          new Date(transaction.transactionDate) >= startDate &&
          new Date(transaction.transactionDate) <= endDate
      );

      return {
        month,
        startDate: moment(startDate).format("MM/DD").toString(),
        endDate: moment(endDate).format("MM/DD").toString(),
        transactions: monthTransactions,
      };
    }
  );

  return accordionPanels;
};

export const formatDateToISO = (date: Moment) => {
  return date.toISOString();
};

export const renderWeek = (
  month: string,
  year: number,
  transactions: Transactions[]
): WeeklyAccordion[] => {
  const monthIndex = moment().month(month).month();
  const startOfMonth = moment([year, monthIndex]).startOf("month");
  const endOfMonth = moment([year, monthIndex]).endOf("month");

  const weekStart = startOfMonth.clone().startOf("week");
  const weekEnd = endOfMonth.clone().endOf("week");

  const weeks = [];

  const current = weekEnd.clone();

  while (current.isSameOrAfter(weekStart)) {
    const weekEnd = current.clone();
    const weekStart = current.clone().startOf("week");

    const startDate = new Date(weekStart.format("MM/DD/YYYY"));

    const endDate = new Date(weekEnd.format("MM/DD/YYYY"));

    const weeklyTransactions = transactions.filter(
      (transaction: Transactions) =>
        new Date(transaction.transactionDate) >= startDate &&
        new Date(transaction.transactionDate) <= endDate
    );

    weeks.push({
      startWeek: `${weekStart.format("MM/DD/YYYY")}`,
      endWeek: `${weekEnd.format("MM/DD/YYYY")}`,
      transactions: weeklyTransactions,
    });
    current.subtract(1, "week");
  }

  return weeks;
};

export const renderDaily = () =>
  // month: string,
  // year: string,
  // transations: Transactions[]
  {
    //const daily = [];
  };
