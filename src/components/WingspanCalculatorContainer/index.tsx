import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
// components
import PrimaryButton from "../UI/PrimaryButton";
import Scorecard from "src/utils/scorecardObj";
import PlayerScorecard from "src/components/WingspanCalculatorContainer/PlayerScorecard";
// import PlayerRow from "./PlayerRow";
import WingspanChat from "./WingspanChat";
// mui
import { Container, Box, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
// hooks
import useSocketIo from "src/hooks/useSocketIo";
// utils/types
import { WingspanChatMessage } from "src/@types/chat";
import { v4 } from "uuid";
import { generateUsername } from "friendly-username-generator";
import { AppGameState } from "src/@types/gameState";

export default function WingspanCalculatorContainer() {
  const [sendTimeout, setSendTimeout] = useState<NodeJS.Timeout>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
  const [username, setUsername] = useState(
    generateUsername({ useRandomNumber: false })
  );
  // messaging
  const [isTyping, setIsTyping] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<WingspanChatMessage[]>([]);
  // calculator
  const [appGameState, setAppGameState] = useState<AppGameState>({});
  // socket hook
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

  /* ----------------------------- app game state ----------------------------- */
  const currScorecardIds = Object.keys(appGameState);

  const handleClickAddScorecard = () => {
    socket?.emit("addScorecard", new Scorecard(socketId, username));
  };

  const handleChangeScorecard = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const handleGameReset = () => socket?.emit("resetApp");

  const allScorecards = Object.keys(appGameState).map((socketId: string) => {
    const singleScorecard = appGameState[socketId];
    const scorecardColumns = Object.values(singleScorecard.rounds);

    return (
      <PlayerScorecard
        key={singleScorecard.socketId}
        username={singleScorecard.username}
        rounds={scorecardColumns}
        onChangeScorecard={handleChangeScorecard}
      />
    );
  });

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

    socket?.on("scorecard", (appGameState: AppGameState) => {
      setAppGameState(appGameState);
    });

    return () => {
      socket?.off();
    };
  }, [socket, timeoutId]);

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
        {currScorecardIds.length < 5 && (
          <PrimaryButton
            sx={{ width: "100%" }}
            onClick={handleClickAddScorecard}
          >
            Add Scorecard
          </PrimaryButton>
        )}
        {currScorecardIds.length > 0 && (
          <PrimaryButton sx={{ width: "100%" }} onClick={handleGameReset}>
            Reset Game?
          </PrimaryButton>
        )}
        <Grid2 container spacing="1.25rem">
          {allScorecards}
        </Grid2>
      </Box>
    </Container>
  );
}
