export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DailyPeso";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "DailyPeso is a personal expense tracker built for effortless daily money management. Users can quickly log expenses and income, categorize transactions by account, and gain clear insights into their spending habits. Designed with a clean UI and a smooth, responsive experience, DailyPeso helps users stay organized, stick to budgets, and make smarter financial decisions — whether they're saving, budgeting, or tracking everyday costs.";

export const APP_SLOGAN = "Simplify Spending Daily";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const useQueryUserDailyTransactions = "user-daily-transactions";
export const inputMaxLength = 30;
export const tabs = {
  TRANSACTION: "transaction",
  ACCOUNTS: "accounts",
};
