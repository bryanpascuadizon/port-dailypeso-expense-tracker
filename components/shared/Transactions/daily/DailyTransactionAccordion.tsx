import { getDailyAccordions } from "@/lib/utils";
import { DailyAccordion, Transactions } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { Sun } from "lucide-react";
import { useMemo } from "react";
import IncomeExpense from "../../IncomeExpense";
import DailyTransactionItem from "./DailyTransactionItem";

const DailyTransactionAccordion = ({
  transactions,
}: {
  transactions: Transactions[];
}) => {
  const dailyAccordionPanels = useMemo(
    () => getDailyAccordions(transactions),
    [transactions]
  );

  return (
    <Accordion type="single" collapsible className="p-3">
      {dailyAccordionPanels.map((dailyTransaction: DailyAccordion) => (
        <AccordionItem
          value={dailyTransaction.date}
          key={dailyTransaction.date}
        >
          <AccordionTrigger className="accordion-trigger">
            <div className="grid grid-cols-2 w-full">
              <div className="col-span-1 flex-start gap-3">
                <div>
                  <Sun className="w-10 h-10 text-yellow-500" />
                </div>
                <div>
                  <p className="font-bold">{dailyTransaction.date}</p>
                  <p className="text-xs text-gray-500">
                    {dailyTransaction.day}
                  </p>
                </div>
              </div>
              <div className="col-span-1">
                <IncomeExpense
                  transactions={dailyTransaction.transactions}
                  className="text-xs"
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {dailyTransaction.transactions.map(
              (transaction: Transactions, index) => (
                <DailyTransactionItem transaction={transaction} key={index} />
              )
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DailyTransactionAccordion;
