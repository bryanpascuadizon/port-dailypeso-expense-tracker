import { Button } from "@/components/ui/button";
import { MONTHS } from "@/lib/constants";
import { formatDateToISO } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

const TransactionDatePopoverContent = ({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}) => {
  const [selectedYear, setSelectedYear] = useState(
    new Date(date).getFullYear()
  );
  const [selectedMonth] = useState(new Date(date).getMonth());

  const handleMonthChange = (monthIndex: number) => {
    const month = MONTHS[monthIndex];
    const year = selectedYear;
    const selectedDate = new Date(formatDateToISO(`${month} ${year}`));
    setDate(selectedDate);
  };

  return (
    <div className="rounded-sm bg-white text-sm mt-2 shadow">
      <div className="flex-between">
        <div
          className="rounded-tl-sm p-3 bg-yellow-400 cursor-pointer"
          onClick={() => setSelectedYear(selectedYear - 1)}
        >
          <ChevronLeft />
        </div>
        <div className="w-full text-center">{selectedYear}</div>
        <div
          className="rounded-tr-sm p-3 bg-yellow-400 cursor-pointer"
          onClick={() => setSelectedYear(selectedYear + 1)}
        >
          <ChevronRight />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 p-2">
        {MONTHS.map((month, index) => (
          <div
            key={index}
            className={`col-span-1 text-center cursor-pointer p-3 button-hover rounded-sm font-normal text-xs md:text-sm ${
              index === selectedMonth && "bg-slate-200"
            }`}
            onClick={() => handleMonthChange(index)}
          >
            {month}
          </div>
        ))}
      </div>
      <Button
        className="m-2 cursor-pointer bg-yellow-400 hover:bg-yellow-400 text-black"
        onClick={() => setDate(new Date())}
      >
        This Month
      </Button>
    </div>
  );
};

export default TransactionDatePopoverContent;
