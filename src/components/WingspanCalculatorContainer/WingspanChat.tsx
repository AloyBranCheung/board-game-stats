import React, { ChangeEvent } from "react";
// components
import SendMessage from "./SendMessage";
// mui
import { Box, Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
// types
import { WingspanChatMessage } from "src/@types/chat";

export interface WingspanChatProps {
  messages: WingspanChatMessage[];
  // eslint-disable-next-line no-unused-vars
  onChangeMessageText: (e: ChangeEvent<HTMLInputElement>) => void;
  messageText: string;
  onClickSend: () => void;
}

export default function WingspanChat({
  messages,
  onChangeMessageText,
  messageText,
  onClickSend,
}: WingspanChatProps) {
  const messagesReceived = messages.map((message) => (
    <Grid2 container key={message.id}>
      <Grid2 xs={3} md={2} lg={1}>
        <Typography>{message.username}:</Typography>
      </Grid2>
      <Grid2 xs={9} md={10} lg={11}>
        <Typography>{message.message}</Typography>
      </Grid2>
    </Grid2>
  ));

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box sx={{ height: "30vh", overflow: "auto" }}>{messagesReceived}</Box>
      <Box>
        <SendMessage
          onChangeMessageText={onChangeMessageText}
          messageText={messageText}
          onClickSend={onClickSend}
        />
      </Box>
    </Card>
  );
}
