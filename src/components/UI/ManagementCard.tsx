import React from "react";
// mui
import { styled, Card } from "@mui/material";

const StyledCard = styled(Card)(() => ({
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1.25rem",
}));

interface ManagementCardProps {
  children: React.ReactNode;
}

export default function ManagementCard({ children }: ManagementCardProps) {
  return <StyledCard>{children}</StyledCard>;
}
