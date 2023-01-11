import React from "react";
// mui
import { Container } from "@mui/material";
// components
import Users from "src/components/ManageStatsContainer/Users";
import BoardGameHistoryTable from "./BoardGameHistoryTable";

export default function ManageStatsContainer() {
  return (
    <Container
      sx={{
        paddingTop: "1.25rem",
        paddingBottom: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <Users />
      <BoardGameHistoryTable />
    </Container>
  );
}
