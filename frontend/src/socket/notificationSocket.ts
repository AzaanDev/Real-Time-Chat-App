import { io } from "socket.io-client";

const URL = "http://localhost:4444";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    console.log(err.message);
  }
});

socket.on("disconnect", () => {
  console.log(socket.connected);
});

socket.on("connect", () => {
  console.log(socket.connected);
});

export default socket;
