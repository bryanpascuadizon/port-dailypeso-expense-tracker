"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import PageTitle from "@/components/shared/PageTitle";
import MonthlyTransactionAccordion from "@/components/shared/Transactions/monthly/MonthlyTransactionAccordion";
import TransactionDateTab from "@/components/shared/Transactions/TransactionDateTab";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { getUserMonthlyTransactions } from "@/lib/actions/transaction-actions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TransactionSkeletonLoader from "../TransactionSkeletonLoader";

const MonthlyTransactions = () => {
  const [date, setDate] = useState(new Date());

  const { data, isPending } = useQuery({
    queryKey: ["user-monthly-transactions", date],
    queryFn: async () => {
      const response = await getUserMonthlyTransactions(date.getFullYear());

      return response;
    },
  });

  return (
    <>
      <PageTitle title="Transactions" />
      {!isPending ? (
        <>
          {data && data.transactions && (
            <>
              <div className="transaction-headers">
                <TransactionDateTab
                  dateType="yearly"
                  date={date}
                  setDate={setDate}
                />
                <TransactionTabs activeTab="Monthly" />
                <IncomeExpense
                  transactions={data.transactions}
                  className="text-xs md:text-sm py-3"
                  isHeader
                />
              </div>

              <div className="transaction-content">
                {data.transactions && (
                  <MonthlyTransactionAccordion
                    transactions={data.transactions}
                    year={date.getFullYear()}
                  />
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <TransactionSkeletonLoader />
      )}
    </>
  );
};

export default MonthlyTransactions;
