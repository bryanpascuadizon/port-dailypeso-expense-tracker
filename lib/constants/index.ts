export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "DailyPeso";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "DailyPeso is your simple, everyday money tracker that makes managing your finances feel easy. Whether you're buying coffee, paying bills, or setting aside savings, you can quickly log your expenses and income in just a few taps. Organize your transactions by account, see where your money’s going, and get a clear picture of your spending habits. With a clean, modern design and a smooth experience, DailyPeso helps you stay on top of your budget without the stress. Perfect for anyone who wants to save more, spend smarter, or just keep their daily spending in check.";

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
