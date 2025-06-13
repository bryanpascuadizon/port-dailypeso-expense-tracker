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
    <Card>
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
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
      </CardContent>
    </Card>
  );
};

export default SummaryChart;
