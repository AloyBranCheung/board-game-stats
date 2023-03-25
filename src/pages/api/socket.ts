/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "src/@types/socketTypes";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
// auth
import isAuthenticated from "src/utils/isAuthenticated";
// jabba
import JabbaBot from "src/utils/jabbaBot";
// types
import { WingspanChatMessage } from "src/@types/chat";
import { PlayerColumnObj } from "src/@types/playerColumns";
// game state
import GameState from "src/utils/gameState";
import Timer from "src/utils/timer";

const {
  addScorecard,
  resetState,
  deleteScorecard,
  updateScorecard,
  currState,
} = new GameState();

const resetApp = new Timer(resetState);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const method = req.method;
  const token = req.headers.authorization?.split(" ")[1];
  switch (method) {
    case "GET":
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

              // when socket establishes a connection
              io.on("connection", (socket) => {
                console.log(
                  `${decodedToken?.decodedToken?.email} has connected.`
                );

                resetApp.clearTimer();

                // if game in progress
                if (currState().gameState.length > 0) {
                  io.emit("scorecard", currState().gameState);
                }

                // when user first joins will emit this
                io.emit("messageFromServer", {
                  id: uuid(),
                  username: JabbaBot.name,
                  message:
                    typeof JabbaBot.prefixPillow === "function" &&
                    JabbaBot.prefixPillow(
                      "A user has entered the chat. Welcome :D. Try '/commands' for a list of my commands."
                    ),
                  _createdAt: Date.now(), // unix date here
                });

                socket.on("resetApp", () => {
                  console.log("resetting...");
                  resetState();
                  io.emit("scorecard", currState().gameState);
                });

                // messaging system
                socket.on(
                  "messageFromClient",
                  (message: WingspanChatMessage) => {
                    socket.broadcast.emit("messageFromServer", message);
                    const { message: wingspanMessage } = message;

                    if (wingspanMessage in JabbaBot) {
                      io.emit("messageFromServer", {
                        id: uuid(),
                        username: JabbaBot.name,
                        message: JabbaBot[wingspanMessage],
                        _createdAt: Date.now(),
                      });
                    }
                  }
                );

                // typing status
                socket.on("isTyping", (status: boolean) => {
                  socket.broadcast.emit("isTyping", status);
                });

                // scorecard share state
                socket.on("scorecard", (scorecardObj: PlayerColumnObj) => {
                  if (scorecardObj.socketId in currState().gameStateHash) {
                    io.emit("messageFromServer", {
                      id: uuid(),
                      username: JabbaBot.name,
                      message:
                        typeof JabbaBot.prefixPillow === "function" &&
                        JabbaBot.prefixPillow("Game state exists"),
                    });
                    return;
                  }
                  if (currState().gameState.length < 5) {
                    addScorecard(scorecardObj);
                    io.emit("scorecard", currState().gameState);
                  }
                });

                socket.on(
                  "deleteScorecard",
                  (params: { socketId: string; index: number }) => {
                    deleteScorecard(params);
                    io.emit("scorecard", currState().gameState);
                  }
                );

                socket.on("updateScorecard", (scorecard: PlayerColumnObj) => {
                  updateScorecard(scorecard);
                  io.emit("scorecard", currState().gameState);
                });

                // user disconnects
                socket.on("disconnect", async () => {
                  const connectedClients = await io.fetchSockets();

                  if (connectedClients.length < 1) {
                    resetApp.timeoutFn(900);
                  }

                  console.log(
                    `${decodedToken?.decodedToken?.email} has disconnected`
                  );

                  io.emit("messageFromServer", {
                    id: uuid(),
                    username: JabbaBot.name,
                    message:
                      typeof JabbaBot.prefixPillow === "function" &&
                      JabbaBot.prefixPillow("A user has left the chat :c"),
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
