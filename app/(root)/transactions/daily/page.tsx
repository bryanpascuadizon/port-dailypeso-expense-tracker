"use client";

import IncomeExpense from "@/components/shared/IncomeExpense";
import NoData from "@/components/shared/NoData";
import PageTitle from "@/components/shared/PageTitle";
import DailyTransactionAccordion from "@/components/shared/Transactions/daily/DailyTransactionAccordion";
import TransactionDateTab from "@/components/shared/Transactions/TransactionDateTab";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { getUserDailyTransactions } from "@/lib/actions/transaction-actions";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getInitialdate } from "@/lib/utils";

const DailyTransactions = () => {
  const searchParams = useSearchParams();

  const startWeek = searchParams.get("week");

  const [date, setDate] = useState(getInitialdate(startWeek));

  const { data } = useQuery({
    queryKey: ["user-daily-transactions", date],
    queryFn: async () => {
      const response = await getUserDailyTransactions(date);

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
              dateType="monthly"
              date={date}
              setDate={setDate}
            />
            <TransactionTabs activeTab="Daily" />
            <IncomeExpense
              transactions={data.transactions}
              className="text-xs md:text-sm py-3"
              isHeader
            />
          </div>
          <div className="transaction-content">
            {data.transactions.length ? (
              <DailyTransactionAccordion transactions={data.transactions} />
            ) : (
              <NoData />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default DailyTransactions;
