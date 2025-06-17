"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getSummaryChartData } from "@/lib/utils";
import { Transactions } from "@/types";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface SummaryChartProps {
  transactions: Transactions[];
  year: number;
}
const SummaryChart = ({ transactions, year }: SummaryChartProps) => {
  const chartSummaryData = useMemo(
    () => getSummaryChartData(transactions, year),
    [transactions, year]
  );

  return (
    <Card className="mb-5">
      <CardHeader>
        <CardTitle className="text-xs md:text-sm">
          Transactions Summary
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={chartSummaryData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={2} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={2} />
            <Bar dataKey="total" fill="var(--color-total)" radius={2} />
          </BarChart>
        </ChartContainer>
        <div className="flex gap-3 mt-5 text-xs md:text-sm">
          <div className="flex flex-start gap-1">
            <div className="bg-green-600 h-3 w-3 md:h-5 md:w-5 rounded-full"></div>
            <p>income</p>
          </div>
          <div className="flex flex-start gap-1">
            <div className="bg-red-600 h-3 w-3 md:h-5 md:w-5 rounded-full"></div>
            <p>expense</p>
          </div>
          <div className="flex flex-start gap-1">
            <div className="bg-black h-3 w-3 md:h-5 md:w-5 rounded-full"></div>
            <p>total</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryChart;
