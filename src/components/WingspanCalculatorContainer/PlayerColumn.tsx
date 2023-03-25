import React, { ChangeEvent } from "react";
// mui
import { Card, Box, Typography, TextField } from "@mui/material";
// types/utils
import { PlayerColumnObj } from "src/@types/playerColumns";
import PrimaryButton from "../UI/PrimaryButton";

export interface PlayerColumnProps {
  indexInArray: number;
  playerColumnObj: PlayerColumnObj;
  onChangeScorecard: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteColumn: () => void;
}

export default function PlayerColumn({
  indexInArray,
  playerColumnObj,
  onChangeScorecard,
  onDeleteColumn,
}: PlayerColumnProps) {
  const {
    username,
    birds,
    bonusCards,
    endOfRoundGoals,
    eggs,
    foodOnCards,
    tuckedCards,
  } = playerColumnObj;

  const totalPoints =
    +birds +
    +bonusCards +
    +endOfRoundGoals +
    +eggs +
    +foodOnCards +
    +tuckedCards;

  return (
    <Card
      sx={{
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <Typography>{username}</Typography>
      <Box display="flex" flexDirection="column" gap="1.25rem">
        <TextField
          id={indexInArray.toString()}
          name="username"
          label="Username"
          value={username}
          onChange={onChangeScorecard}
          type="text"
        />
        <TextField
          id={indexInArray.toString()}
          name="birds"
          label="Birds"
          value={birds}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextField
          id={indexInArray.toString()}
          name="bonusCards"
          label="Bonus Cards"
          value={bonusCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextField
          id={indexInArray.toString()}
          name="endOfRoundGoals"
          label="End of Round Goals"
          value={endOfRoundGoals}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextField
          id={indexInArray.toString()}
          name="eggs"
          label="Eggs"
          value={eggs}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextField
          id={indexInArray.toString()}
          name="foodOnCards"
          label="Food on Cards"
          value={foodOnCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <TextField
          id={indexInArray.toString()}
          name="tuckedCards"
          label="Tucked Cards"
          value={tuckedCards}
          onChange={onChangeScorecard}
          type="number"
          inputProps={{
            min: 0,
          }}
        />
        <Typography>
          <b>Total: </b>
          {totalPoints}
        </Typography>
        <PrimaryButton onClick={onDeleteColumn}>Delete</PrimaryButton>
      </Box>
    </Card>
  );
}
