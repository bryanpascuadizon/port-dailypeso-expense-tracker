"use client";

import Link from "next/link";
import { JSX } from "react";
import { toast } from "sonner";
import DailyTransactionDialog from "./Transactions/daily/DailyTransactionDialog";

const FooterLinks = ({
  footerLinks,
}: {
  footerLinks: {
    title: string;
    link: string;
    icon: JSX.Element;
  }[];
}) => {
  const handleFooterLink = (link: string) => {
    if (link === "/profile" || link === "/summary") {
      toast(
        <p className="toast-text text-destructive">{`${
          link === "/profile" ? "Profile" : "Summary"
        } is not available yet`}</p>
      );
    }
  };

  return (
    <footer className="w-full footer-container">
      <div className="wrapper relative bg-white shadow rounded-t-sm">
        <nav className="grid grid-cols-4 text-sm text-center">
          {footerLinks.map(
            (
              page: { title: string; link: string; icon: JSX.Element },
              index
            ) => (
              <Link
                href={
                  page.link === "/profile" || page.link === "/summary"
                    ? ""
                    : page.link
                }
                className={`footer-links ${
                  index === 0
                    ? "rounded-tl-sm"
                    : index === footerLinks.length - 1 && "rounded-tr-sm"
                }`}
                key={index}
                onClick={() => handleFooterLink(page.link)}
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

export default FooterLinks;
