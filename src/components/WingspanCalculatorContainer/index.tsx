import React, { useEffect } from "react";
// components
import PlayerRow from "./PlayerRow";
// mui
import { Container } from "@mui/material";
// hooks
import useSocketIo from "src/hooks/useSocketIo";

export default function WingspanCalculatorContainer() {
  const socket = useSocketIo();

  // useEffect to attach socket listeners

  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "5rem" }}>
      <PlayerRow />
    </Container>
  );
}
