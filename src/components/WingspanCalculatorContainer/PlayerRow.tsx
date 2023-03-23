import React from "react";
// mui
import { Card, Box } from "@mui/material";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// add react-query later

export default function PlayerRow() {
  const socket = useSocketIo();

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box>PlayerRow</Box>
    </Card>
  );
}
