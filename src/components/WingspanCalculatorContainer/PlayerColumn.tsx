import React, { useEffect, useState } from "react";
// mui
import { Card, Box, Typography } from "@mui/material";
import { Socket } from "socket.io";

export interface PlayerColumnProps {
  username: string;
}

export default function PlayerColumn({ username }: PlayerColumnProps) {
  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Typography>{username}</Typography>
    </Card>
  );
}
