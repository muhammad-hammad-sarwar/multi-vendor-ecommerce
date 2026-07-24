import { io } from "socket.io-client";

export const socket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://mve-chat-production.up.railway.app/",
  {
    autoConnect: false,
    transports: ["websocket"],
  },
);
