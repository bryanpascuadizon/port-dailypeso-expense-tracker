export type Transactions = {
  userId: string;
  transactionDate: Date;
  transactionAmount: number;
  transactionNote: string;
  account: string;
  transactionType: string;
};

export type Accounts = {
  name: string;
  description: string;
};

export type MonthlyAccordion = {
  month: string;
  startDate: string;
  endDate: string;
  transactions: Transactions[];
};

export type WeeklyAccordion = {
  week: string;
  transactions: Transactions[];
};
