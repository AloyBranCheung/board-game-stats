import React from "react";
// mui
import { Card, styled, Typography } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "1.25rem",
}));

export default function Users() {
  return (
    <StyledCard>
      <Typography variant="h5">Manage Users</Typography>
    </StyledCard>
  );
}
