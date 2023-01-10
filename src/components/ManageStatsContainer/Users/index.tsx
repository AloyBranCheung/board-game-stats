import React from "react";
// react-query
import useReadAllUsers from "src/react-query/useReadAllUsers";
// mui
import { Card, Box, styled, Typography, CircularProgress } from "@mui/material";
// components
import UserTable from "./UserTable";

const StyledCard = styled(Card)(() => ({
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1.25rem",
}));

export default function Users() {
  const { data: userList, isLoading } = useReadAllUsers();

  return (
    <StyledCard>
      <Typography variant="h5">Manage Users</Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" padding="1.25rem">
          <CircularProgress />
        </Box>
      ) : (
        <UserTable data={userList || []} />
      )}
    </StyledCard>
  );
}
