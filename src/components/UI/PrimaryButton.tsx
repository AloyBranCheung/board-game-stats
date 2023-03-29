import React from "react";

// mui
import { Button, styled, SxProps } from "@mui/material";

interface PrimaryButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  sx?: SxProps;
}

const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-containedPrimary": {
    color: "black",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function PrimaryButton({
  onClick,
  children,
  sx,
}: PrimaryButtonProps) {
  return (
    <StyledButton
      size="small"
      sx={sx}
      onClick={onClick}
      variant="contained"
      color="primary"
    >
      {children}
    </StyledButton>
  );
}
