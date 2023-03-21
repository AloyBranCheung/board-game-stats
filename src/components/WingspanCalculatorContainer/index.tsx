import React from "react";
// components
import PlayerRow from "./PlayerRow";
// mui
import { Container } from "@mui/material";

export default function WingspanCalculatorContainer() {
  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "5rem" }}>
      <PlayerRow />
    </Container>
  );
}
