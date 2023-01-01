import React from "react";
// mui
import { Box, Typography, CircularProgress } from "@mui/material";
// firebase
import useFirebaseBoardGameDb from "src/hooks/useFirebaseBoardGameDb";
// components
import ManagementCard from "src/components/UI/ManagementCard";

export default function BoardGameHistoryTable() {
  const { isLoading } = useFirebaseBoardGameDb();

  return (
    <ManagementCard>
      <Typography variant="h5">Board Game History</Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" padding="1.25rem">
          <CircularProgress />
        </Box>
      ) : (
        <div>Hello World</div>
      )}
    </ManagementCard>
  );
}
