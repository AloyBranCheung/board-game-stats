import React from "react";
// mui
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface CancelIconProps {
  onClick: () => void;
}

export default function CrossIcon({ onClick }: CancelIconProps) {
  return (
    <IconButton onClick={onClick}>
      <CancelIcon />
    </IconButton>
  );
}
