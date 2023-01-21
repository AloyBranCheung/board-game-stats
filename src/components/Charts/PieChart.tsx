import React from "react";
// chart js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  labels: string[];
  tooltipDataLabel: string;
  data: number[];
  backgroundColors?: string[];
  borderColors?: string[];
  borderWidth?: number;
  options?: ChartOptions;
}

export default function PieChart({
  labels,
  tooltipDataLabel,
  data,
  backgroundColors,
  borderColors,
  borderWidth,
  options,
}: PieChartProps) {
  const chartData: ChartData<"pie"> = {
    labels: labels,
    datasets: [
      {
        label: tooltipDataLabel,
        data: data,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: borderWidth,
      },
    ],
  };

  return <Pie data={chartData} options={options} />;
}

PieChart.defaultProps = {
  borderWidth: 1,
  backgroundColors: ["#cde990", "#ffa600"],
  borderColors: ["#a2b972", "#c48002"],
};
