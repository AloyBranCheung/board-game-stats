import React from "react";
import {
  Box,
  Typography,
  SelectChangeEvent,
  Skeleton,
  Grid,
} from "@mui/material";
// components
import PrimaryCard from "../UI/PrimaryCard";
import PrimarySelect from "../UI/PrimarySelect";
import OverallStatPieChart from "./OverallStatPieChart";
// types
import { MenuItem } from "src/@types/Generics";
import { PieChartData } from "src/@types/ChartTypes";
// utils
import pxToRem from "src/utils/pxToRem";

interface ByBoardGameChartProps {
  isLoading: boolean;
  listOfBoardGames: MenuItem[];
  selectedItem: string;
  onSelectChange: (
    // eslint-disable-next-line no-unused-vars
    event: SelectChangeEvent<any>,
    // eslint-disable-next-line no-unused-vars
    child: React.ReactNode
  ) => void;
  winsByBoardGame: PieChartData;
  lossesByBoardGames: PieChartData;
}

export default function ByBoardGameChart({
  listOfBoardGames,
  selectedItem,
  onSelectChange,
  isLoading,
  winsByBoardGame,
  lossesByBoardGames,
}: ByBoardGameChartProps) {
  return (
    <PrimaryCard>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h5">By Board Games</Typography>
        {isLoading ? (
          <Skeleton variant="rounded" height={pxToRem(200)} />
        ) : (
          <>
            <Box>
              <PrimarySelect
                listOfBoardGames={listOfBoardGames}
                selectedItem={selectedItem}
                onSelectChange={onSelectChange}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item sm={12} md={6}>
                <OverallStatPieChart
                  cardTitle="Wins by Board Game"
                  pieChartData={winsByBoardGame}
                />
              </Grid>
              <Grid item sm={12} md={6}>
                <OverallStatPieChart
                  cardTitle="Losses by Board Game"
                  pieChartData={lossesByBoardGames}
                />
              </Grid>
            </Grid>
          </>
        )}
      </Box>
    </PrimaryCard>
  );
}
