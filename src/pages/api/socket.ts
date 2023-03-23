/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "src/@types/socketTypes";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
// auth
import isAuthenticated from "src/utils/isAuthenticated";
// types
import { WingspanChatMessage } from "src/@types/chat";

const CHAT_BOT = "Jabba🖱️";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const method = req.method;
  switch (method) {
    case "GET":
      const token = req.headers.authorization?.split(" ")[1];
      if (token) {
        try {
          const decodedToken = await isAuthenticated(token);
          if (decodedToken) {
            if (res.socket?.server.io) {
              console.log("Socket is already running");
            } else {
              console.log("Socket is initializing");
              const io = new Server(res.socket.server);
              res.socket.server.io = io;

              io.on("connection", (socket) => {
                console.log(
                  `${decodedToken?.decodedToken?.email} has connected.`
                );

                // when user joins will emit this
                io.emit("messageFromServer", {
                  id: uuid(),
                  username: CHAT_BOT,
                  message: "A user has entered the chat. Welcome :D",
                  _createdAt: Date.now(), // unix date here
                });

                socket.on(
                  "messageFromClient",
                  (message: WingspanChatMessage) => {
                    socket.broadcast.emit("messageFromServer", message);
                  }
                );

                socket.on("disconnect", () => {
                  console.log(
                    `${decodedToken?.decodedToken?.email} has disconnected`
                  );
                  io.emit("messageFromServer", {
                    id: uuid(),
                    username: CHAT_BOT,
                    message: "A user has left the chat :c",
                    _createdAt: Date.now(), // unix date here
                  });
                });
              });
            }
            return res.end();
          }
          return res
            .status(401)
            .send({ status: 401, message: "Invalid token." });
        } catch (error) {
          return res
            .status(401)
            .send({ status: 401, message: "Invalid credentials." });
        }
      } else {
        return res.status(401).send({ status: 401, message: "Need token." });
      }
  }
}
