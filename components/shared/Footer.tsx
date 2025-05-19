import Link from "next/link";
import { HandCoins, CreditCard, ChartNoAxesCombined } from "lucide-react";
import { JSX } from "react";
import DailyTransactionDialog from "./Transactions/daily/DailyTransactionDialog";
import { auth } from "@/auth";
import Image from "next/image";

const Footer = async () => {
  const session = await auth();
  const user = session?.user;

  const userName = user?.name?.split(" ")[0];
  const userImage = user?.image;

  const footerPages = [
    {
      title: "Transactions",
      link: "/transactions/daily",
      icon: <HandCoins className="footer-icon-links" />,
    },
    {
      title: "Accounts",
      link: "/accounts",
      icon: <CreditCard className="footer-icon-links" />,
    },
    {
      title: "Summary",
      link: "/summary",
      icon: <ChartNoAxesCombined className="footer-icon-links" />,
    },
    {
      title: userName ? userName : "",
      link: "/profile",
      icon: userImage ? (
        <Image
          src={userImage}
          alt="profile picture"
          width={35}
          height={35}
          className="footer-icon-links rounded-full"
        />
      ) : (
        <div className="footer-icon-links"></div>
      ),
    },
  ];
  return (
    <footer className="w-full footer-container">
      <div className="wrapper relative bg-white shadow rounded-t-sm">
        <nav className="grid grid-cols-4 text-sm text-center">
          {footerPages.map(
            (
              page: { title: string; link: string; icon: JSX.Element },
              index
            ) => (
              <Link
                href={page.link}
                className={`footer-links ${
                  index === 0
                    ? "rounded-tl-sm"
                    : index === footerPages.length - 1 && "rounded-tr-sm"
                }`}
                key={index}
              >
                {page.icon}
                <p>{page.title}</p>
              </Link>
            )
          )}
        </nav>
        <DailyTransactionDialog />
      </div>
    </footer>
  );
};

export default Footer;
