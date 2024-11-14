import express from "express";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  socket.onAny((event: string, payload: Record<string, string>) => {
    socket.broadcast.emit(event, payload);
  });
});

httpServer.listen(PORT, () =>
  console.log(`[+] Server started on port: ${PORT}`)
);
