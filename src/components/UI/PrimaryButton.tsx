import React from "react";

// mui
import { Button, styled } from "@mui/material";

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton = styled(Button)({
  color: "white",
});

export default function PrimaryButton({
  onClick,
  children,
}: PrimaryButtonProps) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}
