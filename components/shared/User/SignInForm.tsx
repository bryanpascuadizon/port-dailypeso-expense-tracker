"use client";

import { Button } from "@/components/ui/button";
import { googleSignIn } from "@/lib/actions/user-actions";
import { Loader } from "lucide-react";
import { useTransition } from "react";
import Image from "next/image";

const SignInForm = () => {
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleGoogleSignIn = () => {
    const signInGoogle = async () => {
      await googleSignIn();
    };

    startGoogleTransition(() => {
      signInGoogle();
    });
  };

  return (
    <Button
      disabled={isGooglePending}
      className="cursor-pointer w-[70%] m-auto bg-white hover:bg-white text-black border-1 border-slate-1 flex mb-2"
      onClick={handleGoogleSignIn}
    >
      {isGooglePending ? (
        <Loader className="w-full animate-spin" />
      ) : (
        <>
          <Image
            src="/images/google_icon.jpg"
            alt="google"
            width={35}
            height={35}
          />
          <p>Sign in with Goolge</p>
        </>
      )}
    </Button>
  );
};

export default SignInForm;
