export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DailyPeso";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "Simplify Spending Daily";

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
