import { Transactions } from "@/types";

export const getTransactions = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<Transactions[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
    }
  ).then((req) => req.json());

  return response;
};

export const addDailyTransaction = async (
  transaction: {
    amount: number;
    note: string;
    account: string;
    type: string;
    date: Date;
    details: string;
  },
  userId: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions?userId=${userId}`,
    {
      method: "POST",
      body: JSON.stringify(transaction),
    }
  );

  return response;
};

export const editDailyTransaction = async (transaction: Transactions) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions`,
    {
      method: "PATCH",
      body: JSON.stringify(transaction),
    }
  ).then((res) => res.json());

  return response;
};

export const deleteDailyTransaction = async (transactionId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/transactions?transactionId=${transactionId}`,
    {
      method: "DELETE",
    }
  ).then((res) => res.json());

  return response;
};
