import { auth } from "@/auth";
import DailyTransactions from "@/components/shared/Transactions/daily/DailyTransactions";
import { redirect } from "next/navigation";

const DailyTransactionsPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <DailyTransactions />;
};
export default DailyTransactionsPage;
