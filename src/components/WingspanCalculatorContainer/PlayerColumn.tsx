import React, { ChangeEvent } from "react";
// mui
import { Card, Box, Typography, TextField } from "@mui/material";
// types/utils
import { PlayerColumnObj } from "src/@types/playerColumns";

export interface PlayerColumnProps {
  indexInArray: number;
  playerColumnObj: PlayerColumnObj;
  onChangeScorecard: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PlayerColumn({
  indexInArray,
  playerColumnObj,
  onChangeScorecard,
}: PlayerColumnProps) {
  const { username, birds } = playerColumnObj;

  // TODO: Reset Column

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
        />
        <TextField
          id={indexInArray.toString()}
          name="username"
          label="Username"
          value={username}
          onChange={onChangeScorecard}
        />
      </Box>
    </Card>
  );
}
