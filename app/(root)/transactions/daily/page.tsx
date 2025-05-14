"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import PageTitle from "@/components/shared/PageTitle";
import DailyTransactionItem from "@/components/shared/Transactions/DailyTransactionItem";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import {
  getUserDailyTransactions,
  getUserMonthlyTransactions,
} from "@/lib/actions/transaction-actions";
import { Transactions } from "@/types";
import { useQuery } from "@tanstack/react-query";

const DailyTransactions = () => {
  const { data } = useQuery({
    queryKey: ["user-daily-transactions"],
    queryFn: getUserDailyTransactions,
  });

  console.log(getUserMonthlyTransactions(2025));
  return (
    <div>
      <PageTitle title="Transactions" />
      {data && data.transactions && (
        <>
          <TransactionTabs activeTab="Daily" />
          <IncomeExpense transactions={data.transactions!} />
          <div className="transaction-content">
            {data.transactions.map((transaction: Transactions, index) => (
              <DailyTransactionItem transaction={transaction} key={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DailyTransactions;
