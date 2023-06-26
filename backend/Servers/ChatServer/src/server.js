const http = require("http");
const socketIO = require("socket.io");
const ChatRoom = require("./room");
const cors = require("cors");

class SocketServer {
  constructor(port) {
    this.port = port;
    this.server = http.createServer();
    this.io = socketIO(this.server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      const userID = socket.handshake.auth.userID;
      const currentChatID = socket.handshake.auth.currentChatID;
      if (!userID) {
        return next(new Error(userID));
      }
      //Verify the JWT

      socket.userID = userID;
      socket.currentChatID = currentChatID;
      next();
    });

    this.io.on("connection", (socket) => {
      console.log("connected", socket.userID, socket.currentChatID);
      socket.join(socket.currentChatID);

      socket.on("message", (message) => {
        socket.to(socket.currentChatID).emit("message", message);
      });
    });
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = SocketServer;
