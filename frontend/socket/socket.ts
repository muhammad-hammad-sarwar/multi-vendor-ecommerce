import { io } from "socket.io-client";

export const sellerSocket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://mve-chat-production.up.railway.app/",
  {
    autoConnect: false,
    transports: ["websocket"],
  },
);

export const userSocket = io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/"
    : "https://mve-chat-production.up.railway.app/",
  {
    autoConnect: false,
    transports: ["websocket"],
  },
);
