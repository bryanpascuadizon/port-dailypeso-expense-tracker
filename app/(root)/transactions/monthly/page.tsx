"use client";

import PageTitle from "@/components/shared/PageTitle";
import MonthlyTransactionItem from "@/components/shared/Transactions/MonthlyTransactionItem";
import TransactionTabs from "@/components/shared/Transactions/TransactionTabs";
import { Accordion } from "@/components/ui/accordion";
import { getMonthlyAccordions } from "@/lib/utils";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Calendar, Calendar1, Moon } from "lucide-react";
import { Suspense, useState } from "react";

const MonthlyTransactions = () => {
  const [shouldLoad, setShouldLoad] = useState(false);

  const handleAccordionChange = (value: string) => {
    setShouldLoad(true);
  };

  const monthlyAccordionPanels = getMonthlyAccordions();

  return (
    <div>
      <PageTitle title="Transactions" />
      <TransactionTabs activeTab="Monthly" />
      <div className="transaction-content">
        <Accordion
          type="single"
          collapsible
          onValueChange={handleAccordionChange}
          className="p-3"
        >
          {monthlyAccordionPanels &&
            monthlyAccordionPanels.map((month: string) => (
              <AccordionItem value={month} key={month}>
                <AccordionTrigger className="w-full text-left">
                  <div className="rounded-sm p-3 shadow bg-white mb-3 cursor-pointer">
                    <div className="flex-start gap-3">
                      <div>
                        <Calendar1 className="w-10 h-10 text-sky-500" />
                      </div>
                      <p className="font-bold">{month}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* {shouldLoad ? (
                  <Suspense>
                    <MonthlyTransactionItem month="January" />
                  </Suspense>
                ) : null} */}

                  <MonthlyTransactionItem month={month} />
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

export default MonthlyTransactions;
