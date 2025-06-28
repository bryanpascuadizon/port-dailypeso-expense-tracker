"use client";

import { useState } from "react";
import PageTitle from "../PageTitle";
import TransactionDateTab from "../Transactions/TransactionDateTab";
import { useQuery } from "@tanstack/react-query";
import { getUserMonthlyTransactions } from "@/lib/actions/transaction-actions";
import SummaryChart from "./SummaryChart";
import SummaryAccounts from "./SummaryAccounts";
import SummaryExcel from "./SummaryExcel";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartColumn } from "lucide-react";
import SummarySkeletonLoader from "./SummarySkeletonLoader";

const Summary = () => {
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
      <PageTitle title="Summary" />
      {!isPending ? (
        <>
          <div className="transaction-headers">
            <TransactionDateTab
              dateType="yearly"
              date={date}
              setDate={setDate}
            />
          </div>
          {data && data.transactions?.length ? (
            <>
              <div className="transaction-content px-3">
                <SummaryChart
                  transactions={data.transactions}
                  year={date.getFullYear()}
                />
                <SummaryAccounts transactions={data.transactions} />
                <SummaryExcel />
              </div>
            </>
          ) : (
            <div className="w-full py-10 text-center">
              <ChartColumn className="w-18 h-18 md:w-20 md:h-20  m-auto  mb-5 text-green-700" />
              <p className="text-xs md:text-sm">No transactions to summarize</p>
            </div>
          )}
        </>
      ) : (
        <SummarySkeletonLoader />
      )}
    </>
  );
};

export default Summary;
