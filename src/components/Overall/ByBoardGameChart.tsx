import React from "react";
import { Box, Typography, SelectChangeEvent, Skeleton } from "@mui/material";
// components
import PrimayCard from "../UI/PrimayCard";
import PrimarySelect from "../UI/PrimarySelect";
// types
import { MenuItem } from "src/@types/Generics";
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
}

export default function ByBoardGameChart({
  listOfBoardGames,
  selectedItem,
  onSelectChange,
  isLoading,
}: ByBoardGameChartProps) {
  return (
    <PrimayCard>
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
            <Box>Graph</Box>
          </>
        )}
      </Box>
    </PrimayCard>
  );
}
