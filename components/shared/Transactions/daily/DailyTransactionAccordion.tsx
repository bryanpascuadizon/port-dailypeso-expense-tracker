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
  refetchDailyTransactions,
}: {
  transactions: Transactions[];
  refetchDailyTransactions: () => void;
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
          <AccordionTrigger className="accordion-trigger button-hover">
            <div className="flex-between w-full">
              <div className="flex-start gap-3">
                <div>
                  <Sun className="w-10 h-10 text-yellow-400" />
                </div>
                <div>
                  <p className="font-bold text-xs md:text-sm">
                    {dailyTransaction.date}
                  </p>
                  <p className="text-xs text-gray-500">
                    {dailyTransaction.day}
                  </p>
                  <p className="text-xs text-yellow-500">
                    {dailyTransaction.transactions.length > 0 &&
                      `${dailyTransaction.transactions.length} ${
                        dailyTransaction.transactions.length > 1
                          ? "transactions"
                          : "transaction"
                      }`}
                  </p>
                </div>
              </div>
              <div>
                <IncomeExpense
                  transactions={dailyTransaction.transactions}
                  className="text-xs md:text-sm justify-end flex-col"
                />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {dailyTransaction.transactions.map(
              (transaction: Transactions, index) => (
                <DailyTransactionItem
                  transaction={transaction}
                  key={index}
                  refetchDailyTransactions={refetchDailyTransactions}
                />
              )
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default DailyTransactionAccordion;
