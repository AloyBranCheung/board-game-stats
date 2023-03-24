import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
// components
// import PlayerRow from "./PlayerRow";
import WingspanChat from "./WingspanChat";
// mui
import { Container, Box } from "@mui/material";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// utils/types
import { WingspanChatMessage } from "src/@types/chat";
import { v4 } from "uuid";
import { generateUsername } from "friendly-username-generator";
import { PlayerColumnObj } from "src/@types/playerColumns";
import PlayerColumn from "./PlayerColumn";
import PlayerColumnState from "src/utils/scorecardObj";
import PrimaryButton from "../UI/PrimaryButton";

export default function WingspanCalculatorContainer() {
  const [sendTimeout, setSendTimeout] = useState<NodeJS.Timeout>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [username, setUsername] = useState(
    generateUsername({ useRandomNumber: false })
  );
  const [isTyping, setIsTyping] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  const [playerColumns, setPlayerColumns] = useState<PlayerColumnObj[]>([]);
  //
  const { socket, socketId } = useSocketIo();

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

  /* ----------------------------- player columns ----------------------------- */
  const allPlayerColumns = useMemo(
    () =>
      playerColumns.map((playerColumnObj) => (
        <PlayerColumn
          key={playerColumnObj.socketId}
          username={playerColumnObj.username}
        />
      )),
    [playerColumns, setPlayerColumns]
  );

  const handleClickAddColumn = () => {
    socket?.emit("scorecard", new PlayerColumnState(username, socketId));
  };

  /* -------------------------------------------------------------------------- */
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

    socket?.on("scorecard", (serverObj: PlayerColumnObj) => {
      console.log(
        playerColumns.some((pObj) => pObj.socketId !== serverObj.socketId)
      );

      if (playerColumns.some((pObj) => pObj.socketId !== serverObj.socketId))
        setPlayerColumns((prev) => [...prev, serverObj]);
    });

    return () => {
      socket?.off("messageFromServer");
    };
  }, [socket]);

  return (
    <Container
      sx={{
        paddingTop: "1.25rem",
        paddingBottom: "5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <WingspanChat
        isTyping={isTyping}
        username={username}
        onChangeUsername={handleChangeUsername}
        onChangeMessageText={handleChangeMessageText}
        messageText={messageText}
        onClickSend={handleSend}
        messages={messages}
      />
      <Box display="flex" flexDirection="column" gap="1.25rem">
        <PrimaryButton sx={{ width: "100%" }} onClick={handleClickAddColumn}>
          Add Column
        </PrimaryButton>
        <Box display="flex" gap="1.25rem">
          {allPlayerColumns}
        </Box>
      </Box>
    </Container>
  );
}
