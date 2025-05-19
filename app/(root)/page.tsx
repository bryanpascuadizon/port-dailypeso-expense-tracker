import { auth } from "@/auth";
import DailyTransactions from "@/components/shared/Transactions/daily/DailyTransactions";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  } else {
    return redirect("/transactions/daily");
  }
};

export default Home;
