import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://multi-vendor-ecommerce-fe.vercel.app",
    ],
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Hello from Socket Backend" });
});

const users = [];
const addUser = ({ userId, socketId }) => {
  const doesExist = users.find((u) => u.userId === userId);
  if (!doesExist) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((u) => u.socketId != socketId);
};

const getUser = (userId) => {
  const user = users.find((u) => u.userId == userId);
  return user;
};

const createMessage = ({ senderId, receiverId, text, images }) => ({
  id: crypto.randomUUID(),
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// When user will connect io.on conneciton will start
io.on("connection", (socket) => {
  console.log("User connected");
  //   Once the user have built a connection now we will access the user with the scoket connection
  socket.on("addUser", (userId) => {
    addUser({ userId, socketId: socket.id });
    io.emit("getUsers", users);
  });

  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // Now emmiting so the user can receive in realtime
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    if (messages[senderId]) {
      const message = messages.find(
        (m) => m.id == messageId && m.receiverId == receiverId,
      );

      if (message) {
        message.seen = true;
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });

  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessageId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

if (process.env.NODE_ENV === "development") {
  app.listen(8080, () => {
    console.log("Server Running at 8080");
  });
}
