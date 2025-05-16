"use client";

import PageTitle from "@/components/shared/PageTitle";
import TransactionDateTab from "@/components/shared/Transactions/TransactionDateTab";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { useState } from "react";

const CalendarTransactions = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <PageTitle title="Transactions" />
      <TransactionDateTab dateType="monthly" date={date} setDate={setDate} />
      <TransactionTabs activeTab="Calendar" />
      <div className="transaction-content">Calendar Transactions</div>
    </div>
  );
};

export default CalendarTransactions;
