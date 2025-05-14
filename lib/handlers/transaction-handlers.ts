import { Transactions } from "@/types";

export const getTransactions = async (
  userId: string,
  startDate: string,
  endDate: string
): Promise<Transactions[]> => {
  const response = await fetch(
    `/api/transactions?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
    {
      method: "GET",
    }
  ).then((req) => req.json());

  return response;
};
