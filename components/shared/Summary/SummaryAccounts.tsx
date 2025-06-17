import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transactions } from "@/types";

interface SummaryAccountsProps {
  transactions: Transactions[];
}

const SummaryAccounts = ({ transactions }: SummaryAccountsProps) => {
  console.log(transactions);

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">Accounts Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
    </Card>
  );
};

export default SummaryAccounts;
