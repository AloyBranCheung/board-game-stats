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
import { generateUsername } from "friendly-username-generator";

export default function WingspanCalculatorContainer() {
  const [username, setUsername] = useState(
    generateUsername({ useRandomNumber: false })
  );
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  const socket = useSocketIo();

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleChangeMessageText = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessageText(value);
  };

  const handleSend = () => {
    if (messageText.length > 0) {
      const messageToSend = {
        id: v4(),
        username: username,
        message: messageText,
        _createdAt: Date.now(),
      };
      socket?.emit("messageFromClient", messageToSend);
      setMessageText("");
      setMessages((prev) => [...prev, messageToSend]);
    }
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
        username={username}
        onChangeUsername={handleChangeUsername}
        onChangeMessageText={handleChangeMessageText}
        messageText={messageText}
        onClickSend={handleSend}
        messages={messages}
      />
      {/* <PlayerRow /> */}
    </Container>
  );
}
