import axios from "axios";
import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function useSocketIo() {
  const socketInitializer = useCallback(() => {
    (async () => {
      await axios.get("/api/socket");
      socket = io();

      socket.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("socket connected");
      });
    })();
  }, []);

  useEffect(() => {
    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
}
