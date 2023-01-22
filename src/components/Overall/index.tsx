import React, { useMemo, useEffect, useState } from "react";
// mui
import { Container, Grid, SelectChangeEvent } from "@mui/material";
// components
import PrimaryCard from "../UI/PrimaryCard";
import OverallStatPieChart from "./OverallStatPieChart";
import ByBoardGameChart from "./ByBoardGameChart";
// types
import { BoardGameHistoryDb } from "src/@types/BoardGameTypes";
import { PieChartData } from "src/@types/ChartTypes";
import { MenuItem } from "src/@types/Generics";

interface OverallProps {
  isLoading: boolean;
  data: BoardGameHistoryDb[];
}

export default function Overall({ isLoading, data }: OverallProps) {
  // overall wins/losses
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

  // board game selection
  const [listOfBoardGames, setListOfBoardGames] = useState<MenuItem[]>([]);
  const [selectedBoardGame, setSelectedBoardGame] = useState<string>("");

  const handleSelectMenuChange = (event: SelectChangeEvent) => {
    const menuSelected = event.target.value;
    setSelectedBoardGame(menuSelected);
  };

  useEffect(() => {
    if (data.length !== 0) {
      const boardGameList: MenuItem[] = [];
      data.forEach((boardGameHistoryObj) => {
        if (
          !boardGameList.some(
            (historyObj) => historyObj.name === boardGameHistoryObj.boardGame
          )
        )
          boardGameList.push({
            name: boardGameHistoryObj.boardGame,
            value: boardGameHistoryObj._id,
          });
      });

      setSelectedBoardGame(boardGameList[0].value);
      setListOfBoardGames(boardGameList);
    }
  }, [data]);

  return (
    <Container sx={{ padding: "1.25rem 0" }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <PrimaryCard>
            <OverallStatPieChart
              cardTitle="Overall Wins"
              isLoading={isLoading}
              pieChartData={pieChartWinsData}
            />
          </PrimaryCard>
        </Grid>
        <Grid item sm={12} md={6}>
          <PrimaryCard>
            <OverallStatPieChart
              cardTitle="Overall Losses"
              isLoading={isLoading}
              pieChartData={pieChartLossesData}
            />
          </PrimaryCard>
        </Grid>
        <Grid item sm={12}>
          <ByBoardGameChart
            isLoading={isLoading}
            listOfBoardGames={listOfBoardGames}
            selectedItem={selectedBoardGame}
            onSelectChange={handleSelectMenuChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
