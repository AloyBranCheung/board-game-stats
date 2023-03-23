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
  const [sendTimeout, setSendTimeout] = useState<NodeJS.Timeout>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [username, setUsername] = useState(
    generateUsername({ useRandomNumber: false })
  );
  const [isTyping, setIsTyping] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  const socket = useSocketIo();

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handleChangeMessageText = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(sendTimeout);
    const { value } = e.target;
    setMessageText(value);
    const timeout = setTimeout(() => socket?.emit("isTyping", true), 300);
    setSendTimeout(timeout);
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

    socket?.on("isTyping", (status: boolean) => {
      clearTimeout(timeoutId);
      setIsTyping(status);
      const timeout = setTimeout(() => setIsTyping(false), 2000);
      setTimeoutId(timeout);
    });

    return () => {
      socket?.off("messageFromServer");
    };
  }, [socket]);

  return (
    <Container sx={{ paddingTop: "1.25rem", paddingBottom: "5rem" }}>
      <WingspanChat
        isTyping={isTyping}
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
