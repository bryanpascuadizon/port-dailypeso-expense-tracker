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
import IncomeExpense from "../../IncomeExpense";

const MonthlyTransactionAccordion = ({
  transactions,
  year,
}: {
  transactions: Transactions[];
  year: number;
}) => {
  const monthlyAccordionPanels = useMemo(
    () => getMonthlyAccordions(transactions, year),
    [transactions, year]
  );

  return (
    <Accordion type="single" collapsible className="p-3">
      {monthlyAccordionPanels.map((monthTransaction: MonthlyAccordion) => (
        <AccordionItem
          value={monthTransaction.month}
          key={monthTransaction.month}
        >
          <AccordionTrigger className="accordion-trigger">
            <div className="grid grid-cols-2 w-full">
              <div className="col-span-1 flex-start gap-3">
                <div>
                  <Calendar1 className="w-10 h-10 text-sky-500" />
                </div>
                <div>
                  <p className="font-bold">{monthTransaction.month}</p>
                  <p className="text-xs text-gray-400">
                    {monthTransaction.startDate} - {monthTransaction.endDate}
                  </p>
                </div>
              </div>
              <div className="col-span-1 flex-end">
                <IncomeExpense transactions={monthTransaction.transactions} />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <MonthlyTransactionItem
              month={monthTransaction.month}
              transactions={monthTransaction.transactions}
              year={2025}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default MonthlyTransactionAccordion;
