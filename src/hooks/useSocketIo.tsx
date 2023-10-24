import axios from "axios";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
// hooks
import useFirebaseAuth from "./useFirebaseAuth";

export default function useSocketIo() {
  const { getUserIdToken } = useFirebaseAuth();
  const [socket, setSocket] = useState<Socket>();
  const [socketId, setSocketId] = useState<string>("");

  useEffect(() => {
    const socketInitializer = async () => {
      const token = await getUserIdToken();

      await axios.get("/api/socket", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const socket = io();

      setSocket(socket);

      socket.on("connect", () => {
        // eslint-disable-next-line no-console
        console.log("connected to server");
        const sessionId = socket.id;
        setSocketId(sessionId);
      });

      socket.on("disconnect", () => {
        // eslint-disable-next-line no-console
        console.log("disconnected from server");
      });
    };

    if (!socket) {
      socketInitializer();
    }

    // function cleanup() {
    //   socket?.disconnect();
    // }

    // return cleanup;
  }, [getUserIdToken, socket]);

  return { socket, socketId };
}
