import React from "react";
// mui
import { CircularProgress, Box } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
