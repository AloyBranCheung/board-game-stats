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

                socket.on("hello", (arg, callback) => {
                  console.log("hello world", arg);
                  if (typeof callback === "function") callback("got it");
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
