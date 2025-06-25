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
import ExcelJS from "exceljs";

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
    (acc, transaction: Transactions) => acc + Number(transaction.amount),
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
      fullStartWeek: `${weekStart.format("MM/DD/YYYY")}`,
      fullEndWeek: `${weekEnd.format("MM/DD/YYYY")}`,
      dailyTrigger: formatDateToISO(`${month} ${year}`),
      transactions: weeklyTransactions,
    });

    current.subtract(1, "week");
  }

  return weeks;
};

export const getInitialDate = (startWeek: string | null): Date => {
  if (!startWeek) return new Date(formatDateToISO(""));

  const isAlreadyParsed = startWeek === new Date(startWeek).toString();
  const parsedDate = new Date(formatDateToISO(startWeek));

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
        moment(`${week.fullStartWeek}`, "MM/DD/YYYY").format("MMMM DD, YYYY")
      )
    );

    const endWeek = new Date(
      formatDateToISO(
        moment(`${week.fullEndWeek}`, "MM/DD/YYYY").format("MMMM DD, YYYY")
      )
    );

    const calendarWeek = [];

    while (current <= endWeek) {
      const dailyTransaction = transactions.filter(
        (transaction: Transactions) =>
          formatDateToISO(moment(transaction.date).format("MMMM/DD/YYYY")) ===
          formatDateToISO(moment(current).format("MMMM/DD/YYYY"))
      );

      calendarWeek.push({
        day:
          current.getDate() === 1
            ? monthIndex === current.getMonth()
              ? `${monthIndex + 1}/${current.getDate()}`
              : `${current.getMonth() + 1}/${current.getDate()}`
            : `${current.getDate()}`,
        transactions: dailyTransaction,
        formattedDate: new Date(current),
        isIncluded: monthIndex === new Date(current).getMonth(),
      });

      current.setDate(current.getDate() + 1);
    }

    return calendarWeek;
  });

  return calendarPanel;
};

export const incomeExpenseComputation = (transactions: Transactions[]) => {
  const incomeTransactions = transactions.filter(
    (transaction: Transactions) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction: Transactions) => transaction.type === "expense"
  );

  const totalIncome = computeTotalAmount(incomeTransactions);
  const totalExpense = computeTotalAmount(expenseTransactions);

  const totalIncomeExpense = totalIncome - totalExpense;

  return { totalIncome, totalExpense, totalIncomeExpense };
};

export const getSummaryChartData = (
  transactions: Transactions[],
  year: number
) => {
  const monthlyData = getMonthlyAccordions(transactions, year).reverse();

  const summaryData = monthlyData.map(
    (data: { month: string; transactions: Transactions[] }) => {
      const incomeExpense = incomeExpenseComputation(data.transactions);

      return {
        month: data.month,
        income: incomeExpense.totalIncome,
        expense: incomeExpense.totalExpense,
        total: incomeExpense.totalIncomeExpense,
      };
    }
  );

  return summaryData;
};

export const getSummaryAccountsData = (transactions: Transactions[]) => {
  const accountTransactions: {
    accountId: string;
    accountName: string;
    transactions: Transactions[];
  }[] = [];

  transactions.forEach((transaction: Transactions) => {
    const accountId = transaction.transactionAccountId;
    const accountName = transaction.transactionAccount?.name ?? "";

    const accountIndex = accountTransactions.findIndex((accountTransaction) => {
      return accountTransaction.accountId === accountId;
    });

    if (accountIndex !== -1) {
      accountTransactions[accountIndex].transactions.push(transaction);
    } else {
      accountTransactions.push({
        accountId,
        accountName,
        transactions: [transaction],
      });
    }
  });

  const summaryAccounts = accountTransactions.map((account) => {
    return {
      accountId: account.accountId,
      accountName: account.accountName,
      numberOfTranasctions: account.transactions.length,
      transactions: account.transactions,
      ...incomeExpenseComputation(account.transactions),
    };
  });

  return summaryAccounts;
};

export const getSummaryExcelData = (transactions: Transactions[]) => {
  const workbook = new ExcelJS.Workbook();

  const consolidatedTransactions: {
    monthDate: number;
    monthYear: string;
    transactions: Transactions[];
  }[] = [];
  const excelHeaders = [
    "No.",
    "Date",
    "Note",
    "Details",
    "Amount",
    "Account",
    "Income/Expense",
  ];

  //consolidate transactions
  for (const transaction of transactions) {
    const monthYear = moment().format("MMMM YYYY");

    const monthYearIndex = consolidatedTransactions.findIndex(
      (monthTranasction) => {
        return monthTranasction.monthYear === monthYear;
      }
    );

    if (monthYearIndex === -1) {
      consolidatedTransactions.push({
        monthDate: new Date(transaction.date).getDate(),
        monthYear: monthYear,
        transactions: [transaction],
      });
    } else {
      consolidatedTransactions[monthYearIndex].transactions.push(transaction);
    }
  }

  //sory consolidated transactions
  for (const ctransaction of consolidatedTransactions) {
    ctransaction.transactions.sort((a, b) => {
      const currentTransaction = new Date(a.date).getDate();
      const nextTransaction = new Date(b.date).getDate();

      return currentTransaction - nextTransaction;
    });
  }

  //build excel worksheet structure
  for (const transaction of consolidatedTransactions) {
    const monthTransactions = transaction.transactions.map(
      (mtransaction, index) => {
        const transactionDate = moment(mtransaction.date).format("MM/DD/YYYY");

        return [
          index + 1,
          transactionDate,
          mtransaction.note,
          mtransaction.details,
          currencyFormatter.format(mtransaction.amount),
          mtransaction.transactionAccount?.name,
          mtransaction.type === "income" ? "Income" : "Expense",
        ];
      }
    );

    const { totalIncomeExpense } = incomeExpenseComputation(
      transaction.transactions
    );

    //Add excel worksheet
    const monthYearSheet = workbook.addWorksheet(transaction.monthYear);

    //Add excel header row with bold font
    monthYearSheet.addRow(excelHeaders).eachCell((cell) => {
      cell.font = { bold: true };
    });

    //Add transaction rows
    monthYearSheet.addRows([...monthTransactions]);

    //Add a blank row
    monthYearSheet.addRow([]);

    //Add total amount of transactions
    const totalRow = monthYearSheet.addRow([
      "Total",
      "",
      "",
      "",
      currencyFormatter.format(totalIncomeExpense),
    ]);

    //Make eah cell bold in total row
    totalRow.eachCell((cell) => {
      cell.font = { bold: true };
    });

    totalRow.getCell(5).font = {
      bold: true,
      color: { argb: totalIncomeExpense > 0 ? "FF008000" : "FFFF0000" }, // green or red
    };

    //auto-size(width and height) and wrap texts of each cell
    monthYearSheet.columns.forEach((column) => {
      if (!column) return;

      let maxLength = 10; // fallback width

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const cellValue = cell.value ? cell.value.toString() : "";
        if (cellValue.length > maxLength) {
          maxLength = cellValue.length;
        }
      });
      column.width = maxLength + 2;
    });
  }

  return workbook;
};
