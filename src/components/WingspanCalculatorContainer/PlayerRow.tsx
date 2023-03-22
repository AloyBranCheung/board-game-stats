import React, { useEffect } from "react";
// socketio
import io from "Socket.IO-client";
// mui
import { Card, Box } from "@mui/material";
// hooks
import useFirebaseAuth from "src/hooks/useFirebaseAuth";
// add react-query later
import axios from "axios";

let socket;

export default function PlayerRow() {
  const { getUserIdToken } = useFirebaseAuth();

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });
  };
  useEffect(() => {
    socketInitializer();
  }, []);

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
