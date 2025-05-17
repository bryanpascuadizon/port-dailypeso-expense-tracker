export type Transactions = {
  userId: string;
  transactionDate: Date;
  transactionAmount: number;
  transactionNote: string;
  account: string;
  transactionType: string;
};

export type Accounts = {
  id: string;
  name: string;
  userId: string;
};

export type MonthlyAccordion = {
  month: string;
  startDate: string;
  endDate: string;
  transactions: Transactions[];
};

export type WeeklyAccordion = {
  startWeek: string;
  endWeek: string;
  transactions: Transactions[];
};

export type DailyAccordion = {
  date: string;
  day: string;
  transactions: Transactions[];
};

export type FormState = {
  success: boolean;
  message: string;
};
