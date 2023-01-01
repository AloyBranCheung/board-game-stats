import React from "react";
// mui
import { Container } from "@mui/material";
// components
import Users from "./Users";

export default function ManageStatsContainer() {
  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "1.25rem" }}>
      <Users />
    </Container>
  );
}
