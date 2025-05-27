import { Transactions, WeeklyAccordion } from "@/types";
import IncomeExpense from "../../IncomeExpense";
import { useMemo } from "react";
import { renderWeek } from "@/lib/utils";
import { redirect } from "next/navigation";
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
  const weekPanels = useMemo(
    () => renderWeek(month, year, transactions),
    [month, year, transactions]
  );

  const handleDailyRender = (dailyTrigger: string) => {
    const week = new Date(`${dailyTrigger}`);
    redirect(`/transactions/daily?week=${moment(week).format("MMMM-YYYY")}`);
  };

  return (
    weekPanels &&
    weekPanels.map((item: WeeklyAccordion, index: number) => (
      <div
        className="flex-between p-2 rounded-sm cursor-pointer hover:bg-slate-200"
        key={index}
        onClick={() => handleDailyRender(item.dailyTrigger)}
      >
        <div className="">
          <p className="text-xs md:text-sm font-bold">
            {item.startWeek} - {item.endWeek}
          </p>
          <p className="text-xs text-sky-500">
            {item.transactions.length > 0 &&
              `${item.transactions.length} ${
                item.transactions.length > 1 ? "transactions" : "transaction"
              }`}
          </p>
        </div>
        <div></div>
        <div className="">
          <IncomeExpense
            transactions={item.transactions}
            className="text-xs flex-col"
          />
        </div>
      </div>
    ))
  );
};

export default MonthlyTransactionItem;
