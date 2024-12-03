"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
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

interface LanguageData {
  language: string;
  films: number;
}

export  function LanguageChart() {
  const [chartData, setChartData] = useState<LanguageData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/films-by-language');
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching language data:', error);
      }
    };

    fetchData();
  }, []);

  const totalFilms = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.films, 0)
  }, [chartData]);

  const chartConfig = {
    films: {
      label: "Films",
    },
    ...Object.fromEntries(
      chartData.map((item, index) => [
        item.language.toLowerCase(),
        {
          label: item.language,
          color: `hsl(var(--chart-${(index % 5) + 1}))`,
        },
      ])
    ),
  } satisfies ChartConfig;

  if (!chartData.length) return <div>Loading...</div>;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Films by Language</CardTitle>
        <CardDescription>Distribution of films across languages</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="films"
              nameKey="language"
              innerRadius={60}
              strokeWidth={5}
              fill={`hsl(var(--chart-1))`}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold "
                        >
                          {totalFilms.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white"
                        >
                          Total Films
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing distribution of films across different languages
        </div>
      </CardFooter>
    </Card>
  );
}
