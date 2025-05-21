"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserDailyTransactions } from "../actions/transaction-actions";
import { useState } from "react";
import { getInitialdate } from "../utils";

const useTransactions = (currentDate: string) => {
  const [date, setDate] = useState(() => getInitialdate(currentDate));

  const {
    data,
    isPending,
    refetch: refetchDailyTransactions,
  } = useQuery({
    queryKey: ["user-daily-transactions", date],
    queryFn: async () => getUserDailyTransactions(date),
  });

  return {
    date,
    setDate,
    transactions: data?.transactions || [],
    success: data?.success || false,
    message: data?.message || "",
    isPending,
    refetchDailyTransactions,
  };
};

export default useTransactions;
