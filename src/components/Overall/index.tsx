import React, { useMemo } from "react";
// mui
import { Container, Grid } from "@mui/material";
// components
import OverallWinsPieChart from "./OverallWinsPieChart";
// types
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";
import { PieChartData } from "src/@types/ChartTypes";

interface OverallProps {
  isLoading: boolean;
  data: BoardGameHistoryDb[];
}

export default function Overall({ isLoading, data }: OverallProps) {
  const pieChartWinsData: PieChartData = useMemo(() => {
    const pieChartWinsData: PieChartData = {
      labels: [],
      tooltipDataLabel: "Wins",
      data: [],
    };
    const userWins: { [user: string]: number } = {};

    data.forEach((boardGameHistoryObj: BoardGameHistoryDb) => {
      if (!pieChartWinsData.labels.includes(boardGameHistoryObj.winner))
        pieChartWinsData.labels.push(boardGameHistoryObj.winner);
      if (!(boardGameHistoryObj.winner in userWins)) {
        userWins[boardGameHistoryObj.winner] = 1;
      } else {
        userWins[boardGameHistoryObj.winner] += 1;
      }
    });

    pieChartWinsData.data = Object.values(userWins);

    return pieChartWinsData;
  }, [data]);

  return (
    <Container sx={{ padding: "1.25rem 0" }}>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <OverallWinsPieChart
            isLoading={isLoading}
            pieChartData={pieChartWinsData}
          />
        </Grid>
        <Grid item sm={6}>
          <div>Another chart</div>
        </Grid>
      </Grid>
    </Container>
  );
}
