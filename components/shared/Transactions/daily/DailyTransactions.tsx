"use client";

import { useSearchParams } from "next/navigation";
import PageTitle from "../../PageTitle";
import TransactionDateTab from "../TransactionDateTab";
import TransactionTabs from "../TransactionTabs";
import IncomeExpense from "../../IncomeExpense";
import DailyTransactionAccordion from "./DailyTransactionAccordion";
import NoData from "../../NoData";
import TransactionSkeletonLoader from "../TransactionSkeletonLoader";
import useTransactions from "@/lib/hooks/useTransactions";

const DailyTransactions = () => {
  const searchParams = useSearchParams();

  const startWeek = searchParams.get("week");

  const { date, setDate, transactions, isPending, refetchDailyTransactions } =
    useTransactions(startWeek!);

  return (
    <>
      <PageTitle title="Transactions" />
      {!isPending ? (
        <>
          <div className="transaction-headers">
            <TransactionDateTab
              dateType="monthly"
              date={date}
              setDate={setDate}
            />
            <TransactionTabs activeTab="Daily" />
            <IncomeExpense
              transactions={transactions}
              className="text-xs md:text-sm py-3"
              isHeader
            />
          </div>
          <div className="transaction-content">
            {transactions.length ? (
              <DailyTransactionAccordion
                transactions={transactions}
                refetchDailyTransactions={refetchDailyTransactions}
              />
            ) : (
              <NoData />
            )}
          </div>
        </>
      ) : (
        <TransactionSkeletonLoader />
      )}
    </>
  );
};

export default DailyTransactions;
