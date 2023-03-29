import { ChangeEvent } from "react";
import { Box, Select, MenuItem, SelectChangeEvent } from "@mui/material";
// types
import { ScoreFields } from "src/@types/gameState";
import ScoreColumn from "./ScoreColumn";

interface SmallPlayerScorecardProps {
  roundSelected: string;
  rounds: ScoreFields[];
  onChangeRound: (e: SelectChangeEvent) => void;
  onChangeScorecard: (e: ChangeEvent<HTMLInputElement>) => void;
  grandTotal: number;
}

export default function SmallPlayerScorecard({
  rounds,
  roundSelected,
  onChangeRound,
  onChangeScorecard,
  grandTotal,
}: SmallPlayerScorecardProps) {
  const menuOptions = Object.keys(rounds).map((round) => (
    <MenuItem key={round} value={round}>
      Round {+round + 1}
    </MenuItem>
  ));

  const columnTotal = Object.values(rounds[Number(roundSelected)])
    .slice(1)
    .reduce((a, b) => a + b);

  return (
    <Box width="100%">
      <Select
        sx={{ width: "100%", marginBottom: "1.25rem" }}
        value={roundSelected}
        onChange={onChangeRound}
        label="Select Round"
      >
        {menuOptions}
      </Select>
      <ScoreColumn
        index={Number(roundSelected)}
        scoreFields={rounds[Number(roundSelected)]}
        onChangeScorecard={onChangeScorecard}
        label={`Round ${+roundSelected + 1}`}
        isTotal
        total={grandTotal}
        columnTotal={columnTotal}
      />
    </Box>
  );
}
