import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSummaryAccountsData } from "@/lib/utils";
import { Transactions } from "@/types";
import { useMemo } from "react";
import IncomeExpense from "../IncomeExpense";

interface SummaryAccountsProps {
  transactions: Transactions[];
}

const SummaryAccounts = ({ transactions }: SummaryAccountsProps) => {
  const summaryAccounts = useMemo(
    () => getSummaryAccountsData(transactions),
    [transactions]
  );

  console.log(summaryAccounts);

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">Accounts Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        {summaryAccounts &&
          summaryAccounts.map((account, index) => (
            <div
              className="grid grid-cols-3 text-xs md:text-sm mb-2"
              key={index}
            >
              <div className="self-center font-bold">{account.accountName}</div>
              <div className="self-center text-center">
                {account.numberOfTranasctions}{" "}
                {account.numberOfTranasctions > 1
                  ? "transactions"
                  : "transaction"}
              </div>
              <div>
                <IncomeExpense
                  transactions={account.transactions}
                  className=" justify-end flex-col"
                />
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
};

export default SummaryAccounts;
