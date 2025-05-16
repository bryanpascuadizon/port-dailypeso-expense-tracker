"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import PageTitle from "@/components/shared/PageTitle";
import MonthlyTransactionAccordion from "@/components/shared/Transactions/monthly/MonthlyTransactionAccordion";
import TransactionDateTab from "@/components/shared/Transactions/TransactionDateTab";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { getUserMonthlyTransactions } from "@/lib/actions/transaction-actions";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const MonthlyTransactions = () => {
  const [date, setDate] = useState(new Date());

  const { data } = useQuery({
    queryKey: ["user-monthly-transactions", date],
    queryFn: async () => {
      const response = await getUserMonthlyTransactions(date.getFullYear());

      return response;
    },
  });

  return (
    <>
      {data && data.transactions && (
        <>
          <div className="transaction-headers">
            <PageTitle title="Transactions" />
            <TransactionDateTab
              dateType="yearly"
              date={date}
              setDate={setDate}
            />
            <TransactionTabs activeTab="Monthly" />
            <IncomeExpense transactions={data.transactions} />
          </div>

          <div className="transaction-content">
            {data.transactions && (
              <MonthlyTransactionAccordion
                transactions={data.transactions}
                year={date}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default MonthlyTransactions;
