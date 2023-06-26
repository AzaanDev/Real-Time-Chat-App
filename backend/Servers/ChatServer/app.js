const SocketServer = require("./src/server");

const socketServer = new SocketServer(4444);
socketServer.start();
