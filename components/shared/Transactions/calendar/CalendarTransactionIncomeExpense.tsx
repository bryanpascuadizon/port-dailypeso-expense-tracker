import { Separator } from "@/components/ui/separator";
import { currencyFormatter, incomeExpenseComputation } from "@/lib/utils";
import { Transactions } from "@/types";
import { useMemo } from "react";

const CalendarTransactionIncomeExpense = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const { totalIncome, totalExpense, totalIncomeExpense } = useMemo(
    () => incomeExpenseComputation(transactions),
    [transactions]
  );

  return (
    <div className="text-right">
      <p className="income-text">{currencyFormatter.format(totalIncome)}</p>
      <p className="expense-text">{currencyFormatter.format(totalExpense)}</p>
      <Separator />
      <p
        className={`${totalIncomeExpense < 0 ? "expense-text" : "income-text"}`}
      >
        {currencyFormatter.format(totalIncomeExpense)}
      </p>
    </div>
  );
};

export default CalendarTransactionIncomeExpense;
