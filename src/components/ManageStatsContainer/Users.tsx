import React, { useEffect } from "react";
// jotai
import { useAtom } from "jotai";
import { userListAtom } from "src/store/UserStore";
// mui
import { Card, Box, styled, Typography, CircularProgress } from "@mui/material";
// components
import UserTable from "./UserTable";
// custom hooks
import useFirebaseDb from "src/hooks/useFirebaseDb";
import useToastErrorMessage from "src/hooks/useToastErrorMessage";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: "1.25rem",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1.25rem",
}));

export default function Users() {
  const { readAllUsers, isLoading } = useFirebaseDb();
  const toastErrorMessage = useToastErrorMessage();
  const [userList, setUserList] = useAtom(userListAtom);

  // infinite loop if dependencies are added
  useEffect(() => {
    (async () => {
      try {
        const users = await readAllUsers();
        if (users) {
          setUserList(users);
        }
      } catch (error) {
        console.error(error);
        toastErrorMessage("Something went wrong fetching users.");
      }
    })();
  }, []);

  return (
    <StyledCard>
      <Typography variant="h5">Manage Users</Typography>
      {isLoading ? (
        <Box display="flex" justifyContent="center" padding="1.25rem">
          <CircularProgress />
        </Box>
      ) : (
        <UserTable data={userList} />
      )}
    </StyledCard>
  );
}
