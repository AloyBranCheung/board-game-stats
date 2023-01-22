import React from "react";
// mui
import { Typography, Box, Skeleton } from "@mui/material";
// chatjs2
import PieChart from "src/components/Charts/PieChart";
// components
import PrimaryCard from "src/components/UI/PrimayCard";
// types
import { PieChartData } from "src/@types/ChartTypes";
import pxToRem from "src/utils/pxToRem";

interface OverallWinsPieChartProps {
  cardTitle: string;
  pieChartData: PieChartData;
  isLoading: boolean;
}

export default function OverallStatPieChart({
  pieChartData,
  isLoading,
  cardTitle,
}: OverallWinsPieChartProps) {
  const { labels, tooltipDataLabel, data, backgroundColors, borderColors } =
    pieChartData;

  return (
    <PrimaryCard>
      <Typography sx={{ marginBottom: 3 }} variant="h5">
        {cardTitle}
      </Typography>
      <Box width="100%" maxHeight="35vh" display="flex" justifyContent="center">
        {isLoading ? (
          <Skeleton variant="rounded" width="100%" height={pxToRem(200)} />
        ) : (
          <PieChart
            labels={labels}
            tooltipDataLabel={tooltipDataLabel}
            data={data}
            backgroundColors={backgroundColors}
            borderColors={borderColors}
          />
        )}
      </Box>
    </PrimaryCard>
  );
}
