import { Server } from "http";
import { connectDB, Message } from "./database";
import app from "./app";
import config from "./config/config";

import { Socket, Server as SocketIOServer } from "socket.io";

let server: Server;
connectDB();

server = app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

const io = new SocketIOServer(server);

io.on("connection", (socket: Socket) => {
  console.log("A Client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A Client disconnected", socket.id);
  });

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;
    const msg = new Message({ senderId, receiverId, message });
    await msg.save();

    io.to(receiverId).emit("receiveMessage", msg);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
