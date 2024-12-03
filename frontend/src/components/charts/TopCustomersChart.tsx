"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { useState, useEffect } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CustomerData {
  customer_name: string;
  total_spent: number;
}

export  function TopCustomersChart() {
  const [chartData, setChartData] = useState<CustomerData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/top-customers');
        const data = await response.json();
        setChartData(data.customers.map((name: string, index: number) => ({
          customer_name: name,
          total_spent: data.spending[index]
        })));
      } catch (error) {
        console.error('Error fetching top customers data:', error);
      }
    };

    fetchData();
  }, []);

  const chartConfig = {
    total_spent: {
      label: "Total Spent",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  if (!chartData.length) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Customers</CardTitle>
        <CardDescription>Top 10 customers by total spending</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="customer_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)} 
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total_spent" fill="hsl(var(--chart-1))" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        
        <div className="leading-none text-muted-foreground">
          Showing top customers by total spending
        </div>
      </CardFooter>
    </Card>
  );
} 