import Link from "next/link";
import {
  HandCoins,
  CreditCard,
  ChartNoAxesCombined,
  PlusIcon,
  User,
} from "lucide-react";
import { JSX } from "react";
import DailyTransactionDrawer from "./Transactions/daily/DailyTransactionDrawer";

const Footer = () => {
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
      title: "Profile",
      link: "/profile",
      icon: <User className="footer-icon-links" />,
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
        {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 w-13 h-13 md:w-15 md:h-15 flex items-center justify-center">
          <PlusIcon className="w-8 h-8 md:w-10 md:h-10 cursor-pointer" />
        </div> */}

        <DailyTransactionDrawer />
      </div>
    </footer>
  );
};

export default Footer;
