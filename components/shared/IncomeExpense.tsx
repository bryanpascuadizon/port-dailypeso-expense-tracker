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

  const totalIncome = useMemo(() => computeTotalAmount(incomeTransactions), []);
  const totalExpense = useMemo(
    () => computeTotalAmount(expenseTransactions),
    []
  );

  const totalIncomeExpense = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1 text-center income-text p-3">
        <p className="">Income</p>
        <p>{currencyFormatter.format(totalIncome)}</p>
      </div>
      <div className="col-span-1 text-center expense-text p-3">
        <p className="">Expense</p>
        <p>{currencyFormatter.format(totalExpense)}</p>
      </div>
      <div className="col-span-1 text-center p-3">
        <p className="">Total</p>
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
