export type Transactions = {
  id: string;
  userId: string;
  date: Date;
  amount: number;
  note: string;
  transactionAccountId: string;
  type: string;
  transactionAccount: TransactionAccount;
};

export type TransactionAccount = {
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
