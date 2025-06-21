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
import { getUserMonthyTransactionsForSummaryExport } from "@/lib/actions/transaction-actions";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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
    <Card>
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">
          Export Transactions
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="text-xs md:text-sm">
        <Table className="whitespace-nowrap w-1">
          <TableBody>
            <TableRow className="border-0 hover:bg-white">
              <TableCell>
                {" "}
                <p className="font-bold text-xs md:text-sm">From: </p>
              </TableCell>
              <TableCell className="flex items-start">
                <Popover>
                  <PopoverTrigger className="flex gap-2 items-center cursor-pointer">
                    <p className="border-1 border-gray-300 p-2 rounded-sm bg-white text-xs md:text-sm">
                      {" "}
                      {MONTHS[startDate.getMonth()]} {startDate.getFullYear()}
                    </p>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="m-3">
                      <TransactionDatePopoverContent
                        date={startDate}
                        setDate={setStartDate}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
            <TableRow className="hover:bg-white">
              <TableCell>
                {" "}
                <p className="font-bold text-xs md:text-sm">To: </p>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger className="flex gap-2 items-center cursor-pointer">
                    <p className="border-1 border-gray-300 p-2 rounded-sm bg-white text-xs md:text-sm">
                      {" "}
                      {MONTHS[endDate.getMonth()]} {endDate.getFullYear()}
                    </p>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="m-3">
                      <TransactionDatePopoverContent
                        date={endDate}
                        setDate={setEndDate}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p className="text-destructive py-3 text-xs md:text-sm">
          {startDate > endDate &&
            `"From" date cannot be later than the "To" date`}
        </p>
        <Button
          disabled={startDate > endDate}
          className="text-xs md:text-sm  bg-green-700 hover:bg-green-600 text-white cursor-pointer min-w-[120px]"
          onClick={handleTransactionsExport}
        >
          {isPending ? (
            <Loader className="animate-spin" />
          ) : (
            <>Export to excel</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SummaryExcel;
