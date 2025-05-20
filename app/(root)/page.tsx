import { auth } from "@/auth";
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