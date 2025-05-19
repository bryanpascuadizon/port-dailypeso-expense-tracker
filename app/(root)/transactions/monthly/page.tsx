import { auth } from "@/auth";
import MonthlyTransactions from "@/components/shared/Transactions/monthly/MonthlyTransactions";
import { redirect } from "next/navigation";

const MonthlyTransactionsPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <MonthlyTransactions />;
};

export default MonthlyTransactionsPage;
