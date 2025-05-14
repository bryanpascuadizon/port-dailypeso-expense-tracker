import PageTitle from "@/components/shared/PageTitle";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";

const CalendarTransactions = () => {
  return (
    <div>
      <PageTitle title="Transactions" />
      <TransactionTabs activeTab="Calendar" />
      <div className="transaction-content">Calendar Transactions</div>
    </div>
  );
};

export default CalendarTransactions;
