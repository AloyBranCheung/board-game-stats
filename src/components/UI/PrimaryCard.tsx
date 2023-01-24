import React from "react";
//
import { Card, styled } from "@mui/material";

const StyledCard = styled(Card)({
  padding: "1.25rem",
});

interface PrimaryCardProps {
  children: React.ReactNode;
}

export default function PrimayCard({ children }: PrimaryCardProps) {
  return <StyledCard>{children}</StyledCard>;
}
