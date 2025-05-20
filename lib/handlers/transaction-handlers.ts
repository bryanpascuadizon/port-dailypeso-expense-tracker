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
    amount: FormDataEntryValue | null;
    note: FormDataEntryValue | null;
    account: FormDataEntryValue | null;
    type: FormDataEntryValue | null;
    date: FormDataEntryValue | null;
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
