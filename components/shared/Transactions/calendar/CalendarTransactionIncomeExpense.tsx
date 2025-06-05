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
    <div className="md:text-[9px]">
      <p className="income-text">{currencyFormatter.format(totalIncome)}</p>
      <p className="expense-text">{currencyFormatter.format(totalExpense)}</p>
      <p>{currencyFormatter.format(totalIncomeExpense)}</p>
    </div>
  );
};

export default CalendarTransactionIncomeExpense;
