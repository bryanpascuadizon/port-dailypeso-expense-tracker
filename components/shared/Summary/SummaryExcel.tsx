"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { MONTHS } from "@/lib/constants";
import { formatDateToISO, getSummaryExcelData } from "@/lib/utils";
import { PopoverContent } from "@radix-ui/react-popover";
import { saveAs } from "file-saver";
import { useState, useTransition } from "react";
import TransactionDatePopoverContent from "../Transactions/TransactionDatePopoverContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getUserMonthyTransactionsForSummaryExport } from "@/lib/actions/transaction-actions";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";

const SummaryExcel = () => {
  const [startDate, setStartDate] = useState(new Date(formatDateToISO("")));
  const [endDate, setEndDate] = useState(new Date(formatDateToISO("")));
  const [isPending, startTransition] = useTransition();

  const handleTransactionsExport = () => {
    startTransition(async () => {
      const response = await getUserMonthyTransactionsForSummaryExport(
        startDate,
        endDate
      );

      if (!response.success) {
        toast(
          <p className="toast-text text-destructive">{response.message}</p>
        );
        return;
      }

      if (response.transactions) {
        const workbook = getSummaryExcelData(response.transactions);

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const excelStartDate = moment(startDate).format("MMMYYYY");
        const excelEndDate = moment(endDate).format("MMMYYYY");

        saveAs(blob, `${excelStartDate}-${excelEndDate}.xlsx`);
      }
    });
  };
  return (
    <Card className="bg-gray-100 shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">
          Export Transactions
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-xs md:text-sm">
        <div className="mb-3">
          <Popover>
            <PopoverTrigger className="flex gap-2 items-center">
              <p className="font-bold">From: </p>
              <p className="shadow p-2 rounded-sm bg-white">
                {" "}
                {MONTHS[startDate.getMonth()]} {startDate.getFullYear()}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <TransactionDatePopoverContent
                date={startDate}
                setDate={setStartDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="flex gap-2 items-center">
              <p className="font-bold">To: </p>
              <p className="shadow p-2 rounded-sm bg-white">
                {" "}
                {MONTHS[endDate.getMonth()]} {endDate.getFullYear()}
              </p>
            </PopoverTrigger>
            <PopoverContent>
              <TransactionDatePopoverContent
                date={endDate}
                setDate={setEndDate}
              />
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-destructive py-3">
          {startDate > endDate &&
            `"From" date cannot be later than the "To" date`}
        </p>
        <Button
          disabled={startDate > endDate}
          className="text-xs md:text-sm bg-white hover:bg-white text-black font-bold cursor-pointer"
          onClick={handleTransactionsExport}
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Image
                src="/images/excel.jpg"
                alt="export transactions"
                width={20}
                height={20}
              />
              Export
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SummaryExcel;
