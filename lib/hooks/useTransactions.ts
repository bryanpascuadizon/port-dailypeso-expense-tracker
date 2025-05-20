import { useQuery } from "@tanstack/react-query";
import { getUserDailyTransactions } from "../actions/transaction-actions";

const useTransactions = (date: Date) => {
  const dateKey = date.toISOString().split("T")[0];

  const {
    data,
    isPending,
    refetch: refetchDailyTransactions,
  } = useQuery({
    queryKey: ["user-daily-transactions", dateKey],
    queryFn: async () => {
      const response = await getUserDailyTransactions(date);

      return response;
    },
  });

  return { data, isPending, refetchDailyTransactions };
};

export default useTransactions;
