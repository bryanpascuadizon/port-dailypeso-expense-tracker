import { Calendar1, CalendarDays, Sun } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const TransactionTabs = ({ activeTab }: { activeTab: string }) => {
  const transactionPages = [
    {
      title: "Daily",
      link: "/transactions/daily",
      icon: <Sun className="w-5 h-5 text-yellow-500 inline" />,
    },
    {
      title: "Monthly",
      link: "/transactions/monthly",
      icon: <Calendar1 className="w-5 h-5 text-sky-500 inline" />,
    },
    {
      title: "Calendar",
      link: "/transactions/calendar",
      icon: <CalendarDays className="w-5 h-5 text-red-700 inline" />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-3">
        {transactionPages.map(
          (page: { title: string; link: string; icon: JSX.Element }, index) => (
            <Link
              key={index}
              href={page.link}
              className={`w-full p-2 col-span-1 font-bold flex justify-center gap-2 text-sm md:text-base ${
                page.title === activeTab && "transaction-tab-active"
              }`}
            >
              {page.icon}
              <p className="hidden sm:inline">{page.title}</p>
            </Link>
          )
        )}
      </div>
    </>
  );
};

export default TransactionTabs;
