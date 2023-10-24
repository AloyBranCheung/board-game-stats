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
    pieChartWinsData.labels.sort((a, b) => a.localeCompare(b));
    // manipulates data to put in pie chart
    pieChartLossesData.labels = Object.keys(userLosses).sort();
    pieChartLossesData.data = pieChartLossesData.labels.map(
      (name: string) => userLosses[name]
    );

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

  const byBoardGamesData = useMemo(() => {
    if (data.length !== 0 && data.length >= 1) {
      const sortedByBoardGames: {
        [boardGameName: string]: BoardGameHistoryDb[];
      } = {};
      data.forEach((boardGameHistoryObj) => {
        if (!(boardGameHistoryObj.boardGame in sortedByBoardGames)) {
          sortedByBoardGames[boardGameHistoryObj.boardGame] = [
            boardGameHistoryObj,
          ];
        } else {
          sortedByBoardGames[boardGameHistoryObj.boardGame].push(
            boardGameHistoryObj
          );
        }
      });

      if (selectedBoardGame.length >= 1) {
        // wins
        const filteredBoardGameWinsData: PieChartData = {
          labels: [],
          tooltipDataLabel: "Wins",
          data: [],
        };
        const userWins: { [user: string]: number } = {};
        // losses
        const filteredBoardGameLossesData: PieChartData = {
          labels: [],
          tooltipDataLabel: "Losses",
          data: [],
        };
        const userLosses: { [user: string]: number } = {};

        // logic
        if (sortedByBoardGames[selectedBoardGame]) {
          sortedByBoardGames[selectedBoardGame].forEach((boardGame) => {
            // wins
            if (!filteredBoardGameWinsData.labels.includes(boardGame.winner))
              filteredBoardGameWinsData.labels.push(boardGame.winner);
            if (!(boardGame.winner in userWins)) {
              userWins[boardGame.winner] = 1;
            } else {
              userWins[boardGame.winner] += 1;
            }
            // losses
            if (!filteredBoardGameLossesData.labels.includes(boardGame.loser))
              filteredBoardGameLossesData.labels.push(boardGame.loser);
            if (!(boardGame.loser in userLosses)) {
              userLosses[boardGame.loser] = 1;
            } else {
              userLosses[boardGame.loser] += 1;
            }
          });
        }

        filteredBoardGameWinsData.data = Object.values(userWins);
        filteredBoardGameWinsData.labels.sort((a, b) => a.localeCompare(b));

        filteredBoardGameLossesData.labels = Object.keys(userLosses).sort();
        filteredBoardGameLossesData.data =
          filteredBoardGameLossesData.labels.map(
            (name: string) => userLosses[name]
          );

        return { filteredBoardGameWinsData, filteredBoardGameLossesData };
      }
    }
  }, [data, selectedBoardGame]);

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
            value: boardGameHistoryObj.boardGame,
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
            winsByBoardGame={
              byBoardGamesData?.filteredBoardGameWinsData || {
                labels: [],
                tooltipDataLabel: "",
                data: [],
              }
            }
            lossesByBoardGames={
              byBoardGamesData?.filteredBoardGameLossesData || {
                labels: [],
                tooltipDataLabel: "",
                data: [],
              }
            }
          />
        </Grid>
      </Grid>
    </Container>
  );
}
