import { ChangeEvent, useState } from "react";
// mui
import {
  Card,
  Box,
  TextField,
  useTheme,
  useMediaQuery,
  SelectChangeEvent,
} from "@mui/material";
// components
import PrimaryButton from "../UI/PrimaryButton";
import SmallPlayerScorecard from "./SmallPlayerScorecard";
import ScoreColumn from "./ScoreColumn";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// types/utils
import { ScoreFields, SingleScorecard } from "src/@types/gameState";
import { playerColumnState } from "src/utils/scorecardObj";

interface PlayerScorecardProps {
  socketId: string;
  username: string;
  rounds: ScoreFields[];
  singleScorecard: SingleScorecard;
}

export default function PlayerScorecard({
  socketId,
  rounds,
  username,
  singleScorecard,
}: PlayerScorecardProps) {
  const { socket } = useSocketIo();

  // small player scorecard
  const [roundSelected, setRoundSelected] = useState("0");
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const handleClearCard = () =>
    socket?.emit("clearCard", { socketId, username });

  const handleChangeScorecard = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;
    const roundToChange = singleScorecard.rounds[Number(id)] as ScoreFields;
    roundToChange[name as keyof Omit<ScoreFields, "_id">] = Number(value);
    socket?.emit("updateScorecard", singleScorecard);
  };

  // if large screen will map columns
  const scoreColumns = rounds.map((scoreFields, index) => (
    <ScoreColumn
      index={index}
      key={scoreFields._id}
      scoreFields={scoreFields}
      onChangeScorecard={handleChangeScorecard}
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

  // small player scorecard
  const handleChangeRound = (e: SelectChangeEvent) => {
    const { value } = e.target;
    setRoundSelected(value);
  };

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
          onChange={handleChangeScorecard}
          type="text"
        />
        <PrimaryButton onClick={handleClearCard}>Clear</PrimaryButton>
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
            onChangeRound={handleChangeRound}
            onChangeScorecard={handleChangeScorecard}
          />
        )}
      </Box>
    </Card>
  );
}
