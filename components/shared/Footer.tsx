import Link from "next/link";
import {
  HandCoins,
  CreditCard,
  ChartNoAxesCombined,
  Ellipsis,
  HandIcon,
} from "lucide-react";
import { JSX } from "react";

const Footer = () => {
  const footerPages = [
    {
      title: "Transactions",
      link: "/transactions",
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
      <div className="wrapper">
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
      </div>
    </footer>
  );
};

export default Footer;
