import { auth } from "@/auth";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { HandCoins } from "lucide-react";
import { redirect } from "next/navigation";
import SignInForm from "@/components/shared/User/SignInForm";

const SignInPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/transactions/monthly");
  }

  return (
    <div className="w-full max-w-md m-auto ">
      <div className="p-5 flex-center gap-3 m-auto mb-5">
        <HandCoins className="w-18 h-18 md:w-20 md:h-20" />
        <div>
          <p className="text-3xl md:text-5xl font-bold mb-2">{APP_NAME}</p>
          <p>{APP_DESCRIPTION}</p>
        </div>
      </div>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
