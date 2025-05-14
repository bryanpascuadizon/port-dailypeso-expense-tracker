import { computeTotalAmount, currencyFormatter } from "@/lib/utils";
import { Transactions } from "@/types";
import { useMemo } from "react";

const IncomeExpense = ({ transactions }: { transactions: Transactions[] }) => {
  const incomeTransactions = transactions.filter(
    (transaction: Transactions) => transaction.transactionType === "income"
  );
  const expenseTransactions = transactions.filter(
    (transaction: Transactions) => transaction.transactionType === "expense"
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
    <div className="grid grid-cols-3">
      <div className="col-span-1 text-center p-3">
        <p className="font-bold">Income</p>
        <p className="income-text">{currencyFormatter.format(totalIncome)}</p>
      </div>
      <div className="col-span-1 text-center p-3">
        <p className="font-bold">Expense</p>
        <p className="expense-text">{currencyFormatter.format(totalExpense)}</p>
      </div>
      <div className="col-span-1 text-center p-3">
        <p className="font-bold">Total</p>
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
