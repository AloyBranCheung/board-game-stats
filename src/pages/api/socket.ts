// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "Socket.IO";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  res.end();
}
