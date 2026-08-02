import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

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

let users = [];
const addUser = ({ userId, socketId, role }) => {
  const existing = users.find((u) => u.userId === userId);

  if (existing) {
    existing.socketId = socketId;
    // console.log(users);
  } else {
    users.push({ userId, socketId, role });
    // console.log(users);
  }
};

const removeUser = (socketId) => {
  users = users?.filter((u) => u.socketId != socketId);
};

const getUser = (userId) => {
  const user = users?.find((u) => u.userId == userId);
  return user;
};

const createMessage = ({
  messageId,
  senderId,
  receiverId,
  text,
  image,
  conversation,
  createdAt,
  receiver,
}) => ({
  _id: messageId,
  sender: senderId,
  receiverId,
  text,
  image,
  seen: false,
  conversation,
  createdAt,
  receiver,
});

// When user will connect io.on conneciton will start
io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);
  //   Once the user have built a connection now we will access the user with the scoket connection
  socket.on("addUser", ({ id: userId, role }) => {
    // console.log("addUser received:", userId);
    addUser({ userId, socketId: socket.id, role });
    // console.log("SERVER emitting getUsers", users);
    io.emit("getUsers", users);
  });

  socket.on("error", (err) => {
    console.error("❌ Socket Error:", err);
  });

  socket.on("connect_error", (err) => {
    // console.error("❌ Connection Error");
    // console.error("Message:", err.message);
    // console.error(err);
  });

  const messages = {};
  socket.on("sendMessage", (payload) => {
    const message = createMessage(payload);
    const receiverId = payload?.receiverId;
    const receiver = getUser(receiverId, payload?.receiver);
    // console.log("========== SEND MESSAGE ==========", message.text);
    // console.log("Receiver ID:", receiverId);

    // console.log("Users:", users);

    if (!messages[receiverId]) {
      // console.log("Found receiver:", receiver);
      messages[receiverId] = [message];
    } else {
      // console.log("Found receiver:", receiver);
      messages[receiverId].push(message);
    }

    if (receiver) {
      // console.log("Emitting to:", receiver.socketId);
      io.to(receiver.socketId).emit("getMessage", payload);
    } else {
      // console.log("Receiver NOT found");
    }
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    if (messages[senderId]) {
      const message = messages.find(
        (m) => m.messageId == messageId && m.receiverId == receiverId,
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

  socket.on("receivedGetUsers", () => {
    // console.log("SERVER: client confirmed getUsers");
  });

  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", { lastMessage, lastMessageId });
  });

  socket.on("disconnect", (reason) => {
    // console.log("USERS", users);
    // console.log("❌ Disconnected:", socket.id, reason);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

if (process.env.NODE_ENV === "development") {
  server.listen(8080, () => {
    // console.log("Server Running at 8080");
  });
}
