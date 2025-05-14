"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import PageTitle from "@/components/shared/PageTitle";
import MonthlyTransactionAccordion from "@/components/shared/Transactions/monthly/MonthlyTransactionAccordion";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { getUserMonthlyTransactions } from "@/lib/actions/transaction-actions";

import { useQuery } from "@tanstack/react-query";

const MonthlyTransactions = () => {
  const { data } = useQuery({
    queryKey: ["user-monthly-transactions"],
    queryFn: async () => {
      const response = await getUserMonthlyTransactions(
        new Date().getFullYear()
      );

      return response;
    },
  });

  return (
    <>
      {data && data.transactions && (
        <>
          <div className="transaction-headers">
            <PageTitle title="Transactions" />
            <TransactionTabs activeTab="Monthly" />
            <IncomeExpense transactions={data.transactions} />
          </div>

          <div className="transaction-content overflow-y-auto">
            {data && data.transactions && (
              <MonthlyTransactionAccordion
                transactions={data.transactions}
                year={new Date().getFullYear()}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MonthlyTransactions;
