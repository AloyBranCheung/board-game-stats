import React from "react";
// socket
import { socket } from "src/utils/socket";
// mui
import { Card, Box } from "@mui/material";
// hooks
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
// add react-query later
import axios from "axios";

export default function PlayerRow() {
  const { getUserIdToken } = useFirebaseAuth();

  socket.on("connect", () => console.log("connected"));

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box>PlayerRow</Box>
      <button
        onClick={() => {
          console.log("clicked");
          socket.emit("hello", "world");
        }}
      >
        test
      </button>
    </Card>
  );
}
