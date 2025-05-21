"use client";

import { getInitialdate } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PageTitle from "../../PageTitle";
import TransactionDateTab from "../TransactionDateTab";
import TransactionTabs from "../TransactionTabs";
import IncomeExpense from "../../IncomeExpense";
import DailyTransactionAccordion from "./DailyTransactionAccordion";
import NoData from "../../NoData";
import { useQuery } from "@tanstack/react-query";
import { getUserDailyTransactions } from "@/lib/actions/transaction-actions";
import SkeletonLoader from "../../SkeletonLoader";

const DailyTransactions = () => {
  const searchParams = useSearchParams();

  const startWeek = searchParams.get("week");

  const [date, setDate] = useState(() => getInitialdate(startWeek));

  const { data, isPending } = useQuery({
    queryKey: ["user-daily-transactions", date],
    queryFn: async () => {
      const response = await getUserDailyTransactions(date);

      return response;
    },
  });

  return !isPending ? (
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
  ) : (
    <SkeletonLoader />
  );
};

export default DailyTransactions;
