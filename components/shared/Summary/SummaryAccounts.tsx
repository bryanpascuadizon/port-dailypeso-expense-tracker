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
import { Separator } from "@/components/ui/separator";

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
            <>
              <div className="grid grid-cols-2 text-xs md:text-sm" key={index}>
                <div className="self-center ">
                  <p className="font-bold">{account.accountName}</p>
                  <p>
                    {account.numberOfTranasctions}{" "}
                    {account.numberOfTranasctions > 1
                      ? "transactions"
                      : "transaction"}
                  </p>
                </div>
                <div>
                  <IncomeExpense
                    transactions={account.transactions}
                    className=" justify-end flex-col"
                  />
                </div>
              </div>
              {index !== summaryAccounts.length - 1 && <Separator className="my-2" />}
            </>
          ))}
      </CardContent>
    </Card>
  );
};

export default SummaryAccounts;
