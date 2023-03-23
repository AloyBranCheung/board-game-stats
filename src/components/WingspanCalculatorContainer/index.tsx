import React, { ChangeEvent, useEffect, useState } from "react";
// components
// import PlayerRow from "./PlayerRow";
import WingspanChat from "./WingspanChat";
// mui
import { Container } from "@mui/material";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// utils/types
import { WingspanChatMessage } from "src/@types/chat";
import { v4 } from "uuid";

export default function WingspanCalculatorContainer() {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  const socket = useSocketIo();

  const handleChangeMessageText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessageText(value);
  };

  const handleSend = () => {
    const messageToSend = {
      id: v4(),
      username: "test",
      message: messageText,
      _createdAt: Date.now(),
    };
    socket?.emit("messageFromClient", messageToSend);
    setMessageText("");
    setMessages((prev) => [...prev, messageToSend]);
  };

  // useEffect to attach socket listeners
  useEffect(() => {
    socket?.on("messageFromServer", (serverMessage: WingspanChatMessage) => {
      setMessages((prev) => [...prev, serverMessage]);
    });

    return () => {
      socket?.off("messageFromServer");
    };
  }, [socket]);

  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "5rem" }}>
      <WingspanChat
        onChangeMessageText={handleChangeMessageText}
        messageText={messageText}
        onClickSend={handleSend}
        messages={messages}
      />
      {/* <PlayerRow /> */}
    </Container>
  );
}
