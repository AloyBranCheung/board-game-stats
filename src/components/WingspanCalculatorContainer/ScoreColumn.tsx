import React, { ChangeEvent } from "react";
// mui
import {
  Typography,
  Card,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// types/utils
import { ScoreFields } from "src/@types/gameState";

export interface ScoreColumnProps {
  scoreFields: ScoreFields;
  label: string;
  onChangeScorecard?: (e: ChangeEvent<HTMLInputElement>) => void;
  index?: number;
  isAllFieldsDisabled?: boolean;
  isTotal?: boolean;
  total?: number;
  columnTotal?: number;
}

export default function ScoreColumn({
  scoreFields,
  index,
  onChangeScorecard,
  isAllFieldsDisabled,
  label,
  isTotal,
  total,
  columnTotal,
}: ScoreColumnProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { birds, bonusCards, endOfRoundGoals, eggs, foodOnCards, tuckedCards } =
    scoreFields;

  return (
    <Card
      sx={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        width: "100%",
      }}
    >
      <Typography>{label}</Typography>
      <Box display="flex" flexDirection="column" gap="1.25rem">
        <TextField
          id={index?.toString()}
          name="birds"
          label="Birds"
          value={birds}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        <TextField
          id={index?.toString()}
          name="bonusCards"
          label="Bonus Cards"
          value={bonusCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        <TextField
          id={index?.toString()}
          name="endOfRoundGoals"
          label="End of Round Goals"
          value={endOfRoundGoals}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        <TextField
          id={index?.toString()}
          name="eggs"
          label="Eggs"
          value={eggs}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        <TextField
          id={index?.toString()}
          name="foodOnCards"
          label="Food on Cards"
          value={foodOnCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        <TextField
          id={index?.toString()}
          name="tuckedCards"
          label="Tucked Cards"
          value={tuckedCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
          disabled={isAllFieldsDisabled}
        />
        {isTotal && isLargeScreen ? (
          <Typography>
            <b>Grand Total: </b>
            {total}
          </Typography>
        ) : (
          isTotal && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                <b>Total: </b>
                {columnTotal}
              </Typography>
              <Typography>
                <b>Grand Total: </b>
                {total}
              </Typography>
            </Box>
          )
        )}
      </Box>
    </Card>
  );
}

ScoreColumn.defaultProps = {
  isAllFieldsDisabled: false,
  isTotal: false,
  total: undefined,
  columnTotal: undefined,
  onChangeScorecard: undefined,
  index: undefined,
};
