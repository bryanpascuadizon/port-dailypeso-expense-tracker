import { Transactions } from "@/types";
import IncomeExpense from "../../IncomeExpense";
import moment from "moment";

const MonthlyTransactionItem = ({
  month,
  year,
  transactions,
}: {
  month: string;
  year: number;
  transactions: Transactions[];
}) => {

  /**
   * 
   * TODO: Make this as use memo 
   * 
   */
  const renderWeek = () => {
    const monthIndex = moment().month(month).month();
    const startOfMonth = moment([year, monthIndex]).startOf("month");
    const endOfMonth = moment([year, monthIndex]).endOf("month");

    const weekStart = startOfMonth.clone().startOf("week");
    const weekEnd = endOfMonth.clone().endOf("week");

    const weeks = [];

    const current = weekEnd.clone();

    while (current.isSameOrAfter(weekStart)) {
      const weekEnd = current.clone();
      const weekStart = current.clone().startOf("week");

      const startDate = new Date(weekStart.format("MM/DD/YYYY"));

      const endDate = new Date(weekEnd.format("MM/DD/YYYY"));

      const weeklyTransactions = transactions.filter(
        (transaction: Transactions) =>
          new Date(transaction.transactionDate) >= startDate &&
          new Date(transaction.transactionDate) <= endDate
      );

      weeks.push({
        week: `${weekStart.format("MM/DD")} - ${weekEnd.format("MM/DD")}`,
        transactions: weeklyTransactions,
      });
      current.subtract(1, "week");
    }

    return (
      <>
        {weeks.map((item, index) => (
          <div className="grid grid-cols-2 px-3" key={index}>
            <div className="col-span-1 flex-end">
              <p className="">{item.week}</p>
            </div>
            <div className="col-span-1 flex-end">
              <IncomeExpense transactions={item.transactions} />
            </div>
          </div>
        ))}
      </>
    );
  };

  return renderWeek();
};

export default MonthlyTransactionItem;
