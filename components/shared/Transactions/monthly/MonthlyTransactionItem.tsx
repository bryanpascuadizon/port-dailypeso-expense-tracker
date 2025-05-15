import { Transactions, WeeklyAccordion } from "@/types";
import IncomeExpense from "../../IncomeExpense";
import { useMemo } from "react";
import { renderWeek } from "@/lib/utils";
import { redirect } from "next/navigation";

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

  const handleDailyRender = (startWeek: string) => {
    redirect(`/transactions/daily?week=${startWeek}`);
  };

  return (
    weekPanels &&
    weekPanels.map((item: WeeklyAccordion, index: number) => (
      <div
        className="grid grid-cols-2 px-3 rounded-sm cursor-pointer hover:bg-slate-200"
        key={index}
        onClick={() => handleDailyRender(item.startWeek)}
      >
        <div className="col-span-1 flex-start">
          <p className="">
            {item.startWeek} - {item.endWeek}
          </p>
        </div>
        <div className="col-span-1">
          <IncomeExpense transactions={item.transactions} />
        </div>
      </div>
    ))
  );
};

export default MonthlyTransactionItem;
