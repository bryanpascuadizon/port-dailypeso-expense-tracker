import { Transactions } from "@/types";
import React from "react";
import CalendarTransactionIncomeExpense from "./CalendarTransactionIncomeExpense";

const CalendarTransactionItem = ({
  calendarPanels,
}: {
  calendarPanels: {
    day: string;
    transactions: Transactions[];
    formattedDate: Date;
    isIncluded: boolean;
  }[][];
}) => {
  return (
    calendarPanels &&
    calendarPanels.map((calendarPanel, index) => (
      <React.Fragment key={index}>
        {calendarPanel.map((calendarItem, index) => (
          <div
            className={`calendar-tile ${
              calendarItem.isIncluded ? "bg-white" : "bg-gray-200"
            }`}
            key={index}
          >
            <div className="font-bold">{calendarItem.day}</div>
            {calendarItem.transactions.length > 0 && (
              <CalendarTransactionIncomeExpense
                transactions={calendarItem.transactions}
              />
            )}
          </div>
        ))}
      </React.Fragment>
    ))
  );
};

export default CalendarTransactionItem;
