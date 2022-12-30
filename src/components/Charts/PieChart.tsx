import React from "react";
// chart js
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: ChartData<"pie">;
  options?: ChartOptions;
}

export default function PieChart({ data, options }: PieChartProps) {
  return <Pie data={data} options={options} />;
}
