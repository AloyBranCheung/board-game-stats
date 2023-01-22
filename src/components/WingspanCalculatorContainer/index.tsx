import React from "react";
// components
import PlayerRow from "./PlayerRow";
// mui
import { Container, Card } from "@mui/material";

export default function WingspanCalculatorContainer() {
  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "5rem" }}>
      <Card sx={{ padding: "1.25rem" }}>
        <PlayerRow />
      </Card>
    </Container>
  );
}
