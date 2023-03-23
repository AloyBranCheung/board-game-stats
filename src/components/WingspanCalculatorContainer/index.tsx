import React, { useEffect, useState } from "react";
// components
import PlayerRow from "./PlayerRow";
import WingspanChat from "./WingspanChat";
// mui
import { Container } from "@mui/material";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// types
import { WingspanChatMessage } from "src/@types/chat";

export default function WingspanCalculatorContainer() {
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  const socket = useSocketIo();

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
      <WingspanChat messages={messages} />
      {/* <PlayerRow /> */}
    </Container>
  );
}
