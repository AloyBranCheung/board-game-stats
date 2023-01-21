import React, { useMemo } from "react";
// mui
import { Container, Grid } from "@mui/material";
// components
import OverallStatPieChart from "./OverallStatPieChart";
// types
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";
import { PieChartData } from "src/@types/ChartTypes";

interface OverallProps {
  isLoading: boolean;
  data: BoardGameHistoryDb[];
}

export default function Overall({ isLoading, data }: OverallProps) {
  const { pieChartWinsData, pieChartLossesData } = useMemo(() => {
    // wins
    const pieChartWinsData: PieChartData = {
      labels: [],
      tooltipDataLabel: "Wins",
      data: [],
    };
    const userWins: { [user: string]: number } = {};

    // losses
    const pieChartLossesData: PieChartData = {
      labels: [],
      tooltipDataLabel: "Losses",
      data: [],
    };
    const userLosses: { [user: string]: number } = {};

    // by board game

    // logic
    data.forEach((boardGameHistoryObj: BoardGameHistoryDb) => {
      // wins obj
      if (!pieChartWinsData.labels.includes(boardGameHistoryObj.winner))
        pieChartWinsData.labels.push(boardGameHistoryObj.winner);
      if (!(boardGameHistoryObj.winner in userWins)) {
        userWins[boardGameHistoryObj.winner] = 1;
      } else {
        userWins[boardGameHistoryObj.winner] += 1;
      }
      // losses obj
      if (!pieChartLossesData.labels.includes(boardGameHistoryObj.loser))
        pieChartLossesData.labels.push(boardGameHistoryObj.loser);
      if (!(boardGameHistoryObj.loser in userLosses)) {
        userLosses[boardGameHistoryObj.loser] = 1;
      } else {
        userLosses[boardGameHistoryObj.loser] += 1;
      }
    });

    pieChartWinsData.data = Object.values(userWins);
    pieChartLossesData.data = Object.values(userLosses);

    // return wins/losses overall obj
    return { pieChartWinsData, pieChartLossesData };
  }, [data]);

  return (
    <Container sx={{ padding: "1.25rem 0" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <OverallStatPieChart
            cardTitle="Overall Wins"
            isLoading={isLoading}
            pieChartData={pieChartWinsData}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <OverallStatPieChart
            cardTitle="Overall Losses"
            isLoading={isLoading}
            pieChartData={pieChartLossesData}
          />
        </Grid>
        <Grid item sm={12}>
          <div>By Board Game</div>
        </Grid>
      </Grid>
    </Container>
  );
}
