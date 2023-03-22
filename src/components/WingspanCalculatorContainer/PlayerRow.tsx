import React from "react";
// mui
import { Card, Box } from "@mui/material";
// hooks
import useFirebaseAuth from "src/hooks/useFirebaseAuth";

// add react-query later
import axios from "axios";

export default function PlayerRow() {
  const { getUserIdToken } = useFirebaseAuth();

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box>PlayerRow</Box>
      <button
        onClick={async () => {
          const token = await getUserIdToken();
          axios.post("/api/winsandlosses", { token });
        }}
      >
        test
      </button>
    </Card>
  );
}
