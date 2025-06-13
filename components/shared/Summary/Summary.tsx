"use client";

import { useState } from "react";
import PageTitle from "../PageTitle";
import TransactionDateTab from "../Transactions/TransactionDateTab";
import { useQuery } from "@tanstack/react-query";
import { getUserMonthlyTransactions } from "@/lib/actions/transaction-actions";
import SummaryChart from "./SummaryChart";

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
      <div className="transaction-headers">
        <TransactionDateTab dateType="yearly" date={date} setDate={setDate} />
      </div>
      <div>
        {!isPending && data && data.transactions && (
          <>
            <SummaryChart
              transactions={data.transactions}
              year={date.getFullYear()}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Summary;
