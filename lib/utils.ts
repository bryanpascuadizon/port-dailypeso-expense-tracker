import {
  DailyAccordion,
  MonthlyAccordion,
  Transactions,
  WeeklyAccordion,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { MONTHS } from "./constants";

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
    (acc, transaction: Transactions) => acc + transaction.amount,
    0
  );

  return totalAmount;
};

export const renderTransactionType = (type: string) => {
  return `${type === "expense" ? "expense-text" : "income-text"}`;
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
    const monthIndex = new Date(transaction.date).getMonth();
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
          moment(`${month} 1, ${year}`, "MMMM D, YYYY")
            .startOf("month")
            .format("MMM DD, YYYY")
        )
      );
      const endDate = new Date(
        formatDateToISO(
          moment(`${month} 1, ${year}`, "MMMM D, YYYY")
            .endOf("month")
            .format("MMM DD, YYYY")
        )
      );

      const monthTransactions = transactions.filter(
        (transaction: Transactions) =>
          new Date(transaction.date) >= startDate &&
          new Date(transaction.date) <= endDate
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

export const getDailyAccordions = (transactions: Transactions[]) => {
  const dailies: DailyAccordion[] = [];

  transactions.sort((a, b) => {
    const currentTransaction = new Date(a.date).getDate();
    const nextTransaction = new Date(b.date).getDate();

    return nextTransaction - currentTransaction;
  });

  transactions.forEach((transaction: Transactions) => {
    const dailyTransactionDate = transaction.date.toString();
    const dailyDate = dailyTransactionDate.split("T")[0];
    const monthDay = `${moment(dailyDate).format("MMMM D")}`;
    const day = moment(transaction.date).format("dddd");

    const dailyIndex = dailies.findIndex((obj) => obj.date === monthDay);

    if (dailyIndex < 0) {
      dailies.push({
        day: day,
        date: monthDay,
        transactions: [transaction],
      });
    } else {
      dailies[dailyIndex].transactions.push(transaction);
    }
  });

  return dailies;
};

export const formatDateToISO = (date: string) => {
  return moment
    .utc(date === "" ? new Date() : date, "MMMM D, YYYY")
    .toISOString();
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
    const weekStart = current.clone().startOf("week");
    const weekEnd = current.clone();
    const startDate = new Date(
      formatDateToISO(weekStart.format("MMMM/DD/YYYY"))
    );
    const endDate = new Date(formatDateToISO(weekEnd.format("MMMM/DD/YYYY")));

    const weeklyTransactions = transactions.filter(
      (transaction: Transactions) =>
        new Date(transaction.date) >= startDate &&
        new Date(transaction.date) <= endDate
    );

    weeks.push({
      startWeek: `${weekStart.format("MM/DD")}`,
      endWeek: `${weekEnd.format("MM/DD")}`,
      dailyTrigger: formatDateToISO(`${month} ${year}`),
      transactions: weeklyTransactions,
    });

    current.subtract(1, "week");
  }

  return weeks;
};

export const getInitialDate = (startWeek: string | null): Date => {
  console.log(startWeek);
  if (!startWeek) return new Date(formatDateToISO(""));

  const isAlreadyParsed = startWeek === new Date(startWeek).toString();
  const parsedDate = new Date(formatDateToISO(startWeek));

  console.log(isAlreadyParsed);
  return isNaN(parsedDate.getTime())
    ? new Date(formatDateToISO(""))
    : isAlreadyParsed
    ? new Date(startWeek)
    : parsedDate;
};

export const renderCalendar = (
  monthIndex: number,
  year: number,
  transactions: Transactions[]
) => {
  const weeksInMonth = renderWeek(
    MONTHS[monthIndex],
    year,
    transactions
  ).reverse();

  const calendarPanel = weeksInMonth.map((week: WeeklyAccordion) => {
    const current = new Date(
      formatDateToISO(
        moment(`${week.startWeek}/${year}`, "MM/DD/YYYY").format(
          "MMMM DD, YYYY"
        )
      )
    );

    const endWeek = new Date(
      formatDateToISO(
        moment(`${week.endWeek}/${year}`, "MM/DD/YYYY").format("MMMM DD, YYYY")
      )
    );

    const calendarWeek = [];

    while (current <= endWeek) {
      calendarWeek.push({
        formattedDate: new Date(current),
        day: current.getDate(),
        isIncluded: monthIndex === new Date(current).getMonth(),
      });

      current.setDate(current.getDate() + 1);
    }

    return calendarWeek;
  });

  return calendarPanel;
};
