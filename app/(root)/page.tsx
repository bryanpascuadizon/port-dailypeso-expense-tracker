import { redirect } from "next/navigation";

const Home = () => {
  redirect("/transactions/monthly");
  return <div>Home</div>;
};

export default Home;
