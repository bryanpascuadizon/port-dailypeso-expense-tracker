import { auth } from "@/auth";
import { redirect } from "next/navigation";

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto ">
      <div className="p-5">Daily Peso</div>
    </div>
  );
};
