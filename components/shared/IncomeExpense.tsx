import { computeTotalAmount, currencyFormatter } from "@/lib/utils";
import { Transactions } from "@/types";
import { useMemo } from "react";

const IncomeExpense = ({
  transactions,
  className,
  isHeader,
}: {
  transactions: Transactions[];
  className?: string;
  isHeader?: boolean;
}) => {
  const incomeTransactions = transactions.filter(
    (transaction: Transactions) => transaction.type === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction: Transactions) => transaction.type === "expense"
  );

  const totalIncome = useMemo(
    () => computeTotalAmount(incomeTransactions),
    [incomeTransactions]
  );
  const totalExpense = useMemo(
    () => computeTotalAmount(expenseTransactions),
    [expenseTransactions]
  );

  const totalIncomeExpense = totalIncome - totalExpense;

  return (
    <div
      className={`flex ${className} ${
        isHeader && "flex-row justify-between md:gap-3"
      }`}
    >
      <div
        className={`${isHeader ? "text-center w-full" : "income-expense-item"}`}
      >
        <p className="font-bold">Income: </p>
        <p className="income-text">{currencyFormatter.format(totalIncome)}</p>
      </div>
      <div
        className={`${isHeader ? "text-center w-full" : "income-expense-item"}`}
      >
        <p className="font-bold">Expense: </p>
        <p className="expense-text">{currencyFormatter.format(totalExpense)}</p>
      </div>
      <div
        className={`${isHeader ? "text-center w-full" : "income-expense-item"}`}
      >
        <p className="font-bold">Total: </p>
        <p
          className={`${
            totalIncomeExpense < 0 ? "expense-text" : "income-text"
          }`}
        >
          {currencyFormatter.format(totalIncomeExpense)}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
