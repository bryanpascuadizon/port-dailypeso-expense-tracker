import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MonthlyAccordion, Transactions } from "@/types";
import { Accordion } from "@radix-ui/react-accordion";
import { Calendar1 } from "lucide-react";
import MonthlyTransactionItem from "./MonthlyTransactionItem";
import { useMemo } from "react";
import { getMonthlyAccordions } from "@/lib/utils";

const MonthlyTransactionAccordion = ({
  transactions,
  year,
}: {
  transactions: Transactions[];
  year: number;
}) => {
  const monthlyAccordionPanels = useMemo(() => {
    return getMonthlyAccordions(transactions, year);
  }, [transactions, year]);

  return (
    <Accordion type="single" collapsible className="p-3">
      {monthlyAccordionPanels.map((monthTransaction: MonthlyAccordion) => (
        <AccordionItem
          value={monthTransaction.month}
          key={monthTransaction.month}
        >
          <AccordionTrigger className="w-full text-left rounded-sm p-3 shadow bg-white mb-3 cursor-pointer">
            <div className="">
              <div className="flex-start gap-3">
                <div>
                  <Calendar1 className="w-10 h-10 text-sky-500" />
                </div>
                <p className="font-bold">{monthTransaction.month}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <MonthlyTransactionItem month={monthTransaction.month} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MonthlyTransactionAccordion;
