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
  year: Date;
}) => {
  const monthlyAccordionPanels = useMemo(
    () => getMonthlyAccordions(transactions, year.getFullYear()),
    [transactions, year]
  );

  return (
    <Accordion type="single" collapsible className="p-3">
      {monthlyAccordionPanels.map((monthTransaction: MonthlyAccordion) => (
        <AccordionItem
          value={monthTransaction.month}
          key={monthTransaction.month}
        >
          <AccordionTrigger className="accordion-trigger button-hover">
            <div className="flex-between w-full">
              <div className="flex-start gap-3">
                <div>
                  <Calendar1 className="w-10 h-10 text-sky-500" />
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm">
                    {monthTransaction.month}
                  </p>
                  <p className="text-xs text-gray-500">
                    {monthTransaction.startDate} - {monthTransaction.endDate}
                  </p>
                  <p className="text-xs text-gray-500">
                    {monthTransaction.transactions.length > 0 &&
                      `${monthTransaction.transactions.length} ${
                        monthTransaction.transactions.length > 1
                          ? "transactions"
                          : "transaction"
                      }`}
                  </p>
                </div>
              </div>
              <div className="">
                <IncomeExpense
                  transactions={monthTransaction.transactions}
                  className="text-xs md:text-sm flex-col"
                />
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
