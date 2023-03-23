import React, { ChangeEvent } from "react";
import { Box, Typography, TextField } from "@mui/material";
// components
import PrimaryButton from "../UI/PrimaryButton";

interface SendMessageProps {
  // eslint-disable-next-line no-unused-vars
  onChangeMessageText: (e: ChangeEvent<HTMLInputElement>) => void;
  messageText: string;
  onClickSend: () => void;
}

export default function SendMessage({
  onChangeMessageText,
  messageText,
  onClickSend,
}: SendMessageProps) {
  return (
    <Box display="flex" alignItems="center" gap="1.25rem">
      <Typography>Message:</Typography>
      <TextField
        sx={{
          "& .MuiInputBase-input": {
            padding: 0,
          },
          width: "100%",
        }}
        type="text"
        onChange={onChangeMessageText}
        value={messageText}
        onKeyDown={(e) => {
          if (e.key === "Enter") onClickSend();
        }}
      />
      <PrimaryButton onClick={onClickSend}>Send</PrimaryButton>
    </Box>
  );
}
