import useTransactions from "@/lib/hooks/useTransactions";
import { renderCalendar } from "@/lib/utils";
import React from "react";
import { useMemo } from "react";
import PageTitle from "../../PageTitle";
import TransactionDateTab from "../TransactionDateTab";
import TransactionTabs from "../TransactionTabs";
import IncomeExpense from "../../IncomeExpense";
import TransactionSkeletonLoader from "../TransactionSkeletonLoader";
import CalendarTransactionItem from "./CalendarTransactionItem";

const CalendarTransaction = () => {
  const { date, setDate, transactions, isPending } = useTransactions("");

  const calendarPanels = useMemo(
    () => renderCalendar(date.getMonth(), date.getFullYear(), transactions),
    [date, transactions]
  );

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
            <TransactionTabs activeTab="Calendar" />
            <IncomeExpense
              transactions={transactions}
              className="text-xs md:text-sm py-3"
              isHeader
            />
          </div>
          <div className="transaction-content">
            <div className="calendar">
              <CalendarTransactionItem calendarPanels={calendarPanels} />
            </div>
          </div>
        </>
      ) : (
        <TransactionSkeletonLoader isCalendar />
      )}
    </>
  );
};

export default CalendarTransaction;
