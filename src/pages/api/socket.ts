/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from "next";
import { NextApiResponseWithSocket } from "src/@types/socketTypes";
import { Server } from "socket.io";
// auth
import isAuthenticated from "src/utils/isAuthenticated";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  const method = req.method;
  switch (method) {
    case "GET":
      const { token } = req.body;
      if (token) {
        const decodedToken = await isAuthenticated(token);
        if (!decodedToken)
          return res
            .status(401)
            .send({ status: 401, message: "Invalid crednetials." });
        // https://stackoverflow.com/questions/74023393/working-with-typescript-next-js-and-socket-io
        if (res.socket?.server.io) {
          console.log("Socket is already running");
        } else {
          console.log("Socket is initializing");
          const io = new Server(res.socket.server);
          res.socket.server.io = io;

          io.on("connection", (socket) => {
            console.log("a user connected");

            socket.on("hello", (arg, callback) => {
              console.log("hello world", arg);
              if (typeof callback === "function") callback("got it");
            });
          });
        }
        return res.end();
      } else {
        return res.status(401).send({ status: 401, message: "Need token." });
      }
  }
}
