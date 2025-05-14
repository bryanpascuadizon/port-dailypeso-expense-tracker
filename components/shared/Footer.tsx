import Link from "next/link";
import {
  HandCoins,
  CreditCard,
  ChartNoAxesCombined,
  Ellipsis,
  HandIcon,
  PlusIcon,
} from "lucide-react";
import { JSX } from "react";

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
      title: "More",
      link: "/",
      icon: <Ellipsis className="footer-icon-links" />,
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
              <Link href={page.link} className="footer-links" key={index}>
                {page.icon}
                <p>{page.title}</p>
              </Link>
            )
          )}
        </nav>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-400 w-15 h-15 flex items-center justify-center">
          <PlusIcon className="w-10 h-10 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
