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
import { Transactions } from "@/types";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface SummaryChartProps {
  transactions: Transactions[];
  isSummaryChart: boolean;
}
const SummaryChart = ({ transactions, isSummaryChart }: SummaryChartProps) => {
  console.log(transactions, isSummaryChart);

  const chartData = [
    { month: "January", income: 186, expense: 80, total: 100 },
    { month: "February", income: 186, expense: 80, total: 100 },
    { month: "March", income: 186, expense: 80, total: 100 },
    { month: "April", income: 186, expense: 80, total: 100 },
    { month: "May", income: 186, expense: 80, total: 100 },
    { month: "June", income: 186, expense: 80, total: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={chartData}>
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
