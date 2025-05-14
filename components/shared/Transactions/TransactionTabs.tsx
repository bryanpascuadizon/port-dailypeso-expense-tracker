import Link from "next/link";

const TransactionTabs = ({ activeTab }: { activeTab: string }) => {
  const transactionPages = [
    {
      title: "Daily",
      link: "/transactions/daily",
    },
    {
      title: "Monthly",
      link: "/transactions/monthly",
    },
    {
      title: "Calendar",
      link: "/transactions/calendar",
    },
  ];

  return (
    <div className="grid grid-cols-3">
      {transactionPages.map((page: { title: string; link: string }, index) => (
        <Link
          key={index}
          href={page.link}
          className={`p-1 col-span-1 text-center font-bold ${
            page.title === activeTab &&
            "border-b-3 border-b-gray-700 shadow bg-white rounded-t-sm"
          }`}
        >
          {page.title}
        </Link>
      ))}
    </div>
  );
};

export default TransactionTabs;
