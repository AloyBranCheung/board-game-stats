import { ChangeEvent } from "react";
// mui
import {
  Card,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
// types/utils
import { ScoreFields } from "src/@types/gameState";
import ScoreColumn from "./ScoreColumn";
import { playerColumnState } from "src/utils/scorecardObj";
import PrimaryButton from "../UI/PrimaryButton";
import SmallPlayerScorecard from "./SmallPlayerScorecard";

interface PlayerScorecardProps {
  socketId: string;
  username: string;
  rounds: ScoreFields[];
  onChangeScorecard: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickClear: (socketId: string) => void;
  roundSelected: string;
  onChangeRound: (e: SelectChangeEvent) => void;
}

export default function PlayerScorecard({
  socketId,
  rounds,
  username,
  onChangeScorecard,
  onClickClear,
  roundSelected,
  onChangeRound,
}: PlayerScorecardProps) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  // if large screen will map columns
  const scoreColumns = rounds.map((scoreFields, index) => (
    <ScoreColumn
      index={index}
      key={scoreFields._id}
      scoreFields={scoreFields}
      onChangeScorecard={onChangeScorecard}
      label={`Round ${index + 1}`}
    />
  ));

  // scorefields object
  const scorecardTotalEachField = rounds.reduce((prevValue, currValue) => {
    Object.entries(currValue)
      .slice(1)
      .forEach(([key, value]) => {
        prevValue[key as keyof Omit<ScoreFields, "_id">] += value;
      });
    return prevValue;
  }, playerColumnState());

  // number total
  const grandTotal: number = Object.values(scorecardTotalEachField)
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <TextField
          size="small"
          id={socketId}
          name="username"
          label="Username"
          value={username}
          onChange={onChangeScorecard}
          type="text"
        />
        <PrimaryButton onClick={() => onClickClear(socketId)}>
          Clear
        </PrimaryButton>
      </Box>
      <Box display="flex" gap="1.25rem">
        {isLargeScreen ? (
          <>
            {scoreColumns}
            <ScoreColumn
              scoreFields={scorecardTotalEachField}
              label="Total"
              isAllFieldsDisabled
              isTotal
              total={grandTotal}
            />
          </>
        ) : (
          <SmallPlayerScorecard
            grandTotal={grandTotal}
            rounds={rounds}
            roundSelected={roundSelected}
            onChangeRound={onChangeRound}
            onChangeScorecard={onChangeScorecard}
          />
        )}
      </Box>
    </Card>
  );
}
