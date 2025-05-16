import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import { Dispatch, SetStateAction } from "react";
import TransactionDatePopoverContent from "./TransactionDatePopoverContent";

const TransactionDateTab = ({
  dateType,
  date,
  setDate,
}: {
  dateType: string;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const handleTransactionTabDateChange = (increase: boolean) => {
    let assignDate: Date = new Date(date);

    if (dateType === "yearly") {
      if (increase) {
        assignDate = new Date(assignDate.setFullYear(date.getFullYear() + 1));
      } else {
        assignDate = new Date(assignDate.setFullYear(date.getFullYear() - 1));
      }
    } else {
      if (increase) {
        assignDate = new Date(assignDate.setMonth(date.getMonth() + 1));
      } else {
        assignDate = new Date(assignDate.setMonth(date.getMonth() - 1));
      }
    }
    setDate(assignDate);
  };

  return (
    <div className="transaction-date-tab flex-between gap-3 mb-3">
      <div
        className="transaction-date-tab-arrows button-hover"
        onClick={() => handleTransactionTabDateChange(false)}
      >
        <ChevronLeft className="w-5" />
      </div>
      <Popover>
        <PopoverTrigger className="w-full" disabled={dateType === "yearly"}>
          <div className="transaction-date-tab-date button-hover">
            {dateType === "yearly"
              ? moment(date).format("YYYY")
              : moment(date).format("MMMM YYYY")}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <TransactionDatePopoverContent date={date} setDate={setDate} />
        </PopoverContent>
      </Popover>
      <div
        className="transaction-date-tab-arrows button-hover"
        onClick={() => handleTransactionTabDateChange(true)}
      >
        <ChevronRight className="w-5" />
      </div>
    </div>
  );
};

export default TransactionDateTab;
