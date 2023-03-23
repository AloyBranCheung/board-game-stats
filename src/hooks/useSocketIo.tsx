import axios from "axios";
import { useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
// hooks
import useFirebaseAuth from "./useFirebaseAuth";

let socket: Socket;

export default function useSocketIo() {
  const { getUserIdToken } = useFirebaseAuth();
  const socketInitializer = useCallback(() => {
    (async () => {
      const token = await getUserIdToken();

      await axios.get("/api/socket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      socket = io();

      socket.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("socket connected");
      });
    })();
  }, [getUserIdToken]);

  useEffect(() => {
    socketInitializer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return socket;
}
