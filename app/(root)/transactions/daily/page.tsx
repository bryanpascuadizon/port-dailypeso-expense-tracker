"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import PageTitle from "@/components/shared/PageTitle";
import DailyTransactionItem from "@/components/shared/Transactions/daily/DailyTransactionItem";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { getUserDailyTransactions } from "@/lib/actions/transaction-actions";
import { Transactions } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";

const DailyTransactions = () => {
  const searchParams = useSearchParams();

  const startWeek = searchParams.get("week");

  const { data } = useQuery({
    queryKey: ["user-daily-transactions", startWeek],
    queryFn: async () => {
      const response = await getUserDailyTransactions(startWeek);

      return response;
    },
  });

  return (
    <>
      {data && data.transactions && (
        <>
          <div className="transaction-headers">
            <PageTitle title="Transactions" />
            <TransactionTabs activeTab="Daily" />
            <IncomeExpense transactions={data.transactions} />
          </div>
          <div className="transaction-content">
            {data.transactions.map((transaction: Transactions, index) => (
              <DailyTransactionItem transaction={transaction} key={index} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DailyTransactions;
