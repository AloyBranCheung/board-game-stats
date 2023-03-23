import React, { ChangeEvent, useRef, useEffect } from "react";
// components
import SendMessage from "./SendMessage";
// mui
import { Box, Card, TextField, Typography } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2";
// types
import { WingspanChatMessage } from "src/@types/chat";
import pxToRem from "src/utils/pxToRem";

export interface WingspanChatProps {
  messages: WingspanChatMessage[];
  // eslint-disable-next-line no-unused-vars
  onChangeMessageText: (e: ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onChangeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  messageText: string;
  onClickSend: () => void;
  username: string;
}

export default function WingspanChat({
  messages,
  username,
  onChangeUsername,
  onChangeMessageText,
  messageText,
  onClickSend,
}: WingspanChatProps) {
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const messagesReceived = messages.map((message) => (
    // <Grid2 container key={message.id}>
    //   <Grid2 xs={4} md={2} lg={1}>
    //     <Typography>{message.username}:</Typography>
    //   </Grid2>
    //   <Grid2 xs={8} md={10} lg={11}>
    //     <Typography>{message.message}</Typography>
    //   </Grid2>
    // </Grid2>
    <Box
      key={message.id}
      sx={{
        display: "flex",
        gap: "1.25rem",
        padding: ".25rem",
        border: "1px solid black",
        boxShadow: "5px 5px 0px 0px #000000",
        borderRadius: pxToRem(8),
      }}
    >
      <Typography component="b" sx={{ width: "100%", flexBasis: 120 }}>
        <b>{message.username}</b>:
      </Typography>
      <Typography sx={{ width: "100%" }}>{message.message}</Typography>
    </Box>
  ));

  useEffect(() => {
    if (messageContainerRef?.current?.scrollTop) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card sx={{ padding: "1.25rem" }}>
      <Box
        display="flex"
        gap="1.25rem"
        alignItems="center"
        marginBottom="1.25rem"
      >
        <Typography>Username: </Typography>
        <TextField
          placeholder="Username"
          onChange={onChangeUsername}
          value={username}
          sx={{
            "& .MuiInputBase-input": {
              padding: 0,
              paddingLeft: ".5rem",
            },
          }}
        />
      </Box>
      <Box
        ref={messageContainerRef}
        sx={{
          height: "30vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        {messagesReceived}
      </Box>
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
