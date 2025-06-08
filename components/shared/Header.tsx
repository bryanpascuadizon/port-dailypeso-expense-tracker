"use client";

import { SignOut } from "@/lib/actions/user-actions";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { HandCoins, Loader, Power } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

const Header = () => {
  const [isLogoutPending, startLogoutTransition] = useTransition();

  const handleLogOut = () => {
    startLogoutTransition(async () => {
      await SignOut();
    });
  };

  return (
    <header className="w-full header-container">
      <div className="wrapper flex-start bg-white py-3 rounded-b-sm shadow">
        <div className="flex-start gap-2 px-5 w-full">
          <div>
            <HandCoins className="w-11 h-11 md:w-13 md:h-13" />
          </div>
          <div className="w-full">
            <Link href="/transactions/daily">
              <p className="header-title">{APP_NAME}</p>
              <p className="header-slogan">{APP_DESCRIPTION}</p>
            </Link>
          </div>
          <nav className="flex justify-end w-full">
            {isLogoutPending ? (
              <Loader className="animate-spin" />
            ) : (
              <Power
                onClick={() => handleLogOut()}
                className="cursor-pointer mr-5"
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
