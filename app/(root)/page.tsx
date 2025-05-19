import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }
  return <div>Home</div>;
};

export default Home;
