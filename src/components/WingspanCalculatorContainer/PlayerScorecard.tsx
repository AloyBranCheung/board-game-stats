import { ChangeEvent } from "react";
// mui
import { Card, Box, Typography } from "@mui/material";
// types/utils
import { ScoreFields } from "src/@types/gameState";
import ScoreColumn from "./ScoreColumn";
import { playerColumnState } from "src/utils/scorecardObj";

interface PlayerScorecardProps {
  username: string;
  rounds: ScoreFields[];
  onChangeScorecard: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PlayerScorecard({
  rounds,
  username,
  onChangeScorecard,
}: PlayerScorecardProps) {
  const scoreColumns = rounds.map((scoreFields, index) => (
    <ScoreColumn
      key={scoreFields._id}
      scoreFields={scoreFields}
      onChangeScorecard={onChangeScorecard}
      label={`Round ${index + 1}`}
    />
  ));

  const scorecardTotalEachField = rounds.reduce((prevValue, currValue) => {
    Object.entries(currValue)
      .slice(1)
      .forEach(([key, value]) => {
        prevValue[key as keyof Omit<ScoreFields, "_id">] += value;
      });
    return prevValue;
  }, playerColumnState());

  const grandTotal = Object.values(scorecardTotalEachField)
    .slice(1)
    .reduce((a, b) => a + b);

  return (
    <Card
      sx={{
        width: "100%",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <Typography>Username: {username}</Typography>
      <Box display="flex" gap="1.25rem">
        {scoreColumns}
        <ScoreColumn
          scoreFields={scorecardTotalEachField}
          label="Total"
          isAllFieldsDisabled
          isTotal
          total={grandTotal}
        />
      </Box>
    </Card>
  );
}
