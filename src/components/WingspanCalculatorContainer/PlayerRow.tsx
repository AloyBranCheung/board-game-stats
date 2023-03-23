import React from "react";
// mui
import { Card, Box } from "@mui/material";
// hooks
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
import useSocketIo from "src/hooks/useSocketIo";
// add react-query later

export default function PlayerRow() {
  const { getUserIdToken } = useFirebaseAuth();
  const socket = useSocketIo();

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box>PlayerRow</Box>
    </Card>
  );
}
