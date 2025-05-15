import { redirect } from "next/navigation";

const Home = () => {
  redirect("/transactions/daily");
  return <div>Home</div>;
};

export default Home;
