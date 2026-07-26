import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";
import { isAuthenticated, isLoggedIn, isSeller } from "../middlewares/auth.js";
import catchAsync from "../utils/catchAsync.js";
import upload from "../middlewares/upload.middleware.js";
import cloudinaryUpload from "../middlewares/cloudinary.upload.js";
const messageRouter = Router();

messageRouter.post(
  "/seller/:conversationId",
  isSeller,
  upload.single("image"),
  cloudinaryUpload("messages", true),
  catchAsync(messageController.sendMessage),
);

messageRouter.post(
  "/user/:conversationId",
  isAuthenticated,
  upload.single("image"),
  cloudinaryUpload("messages", true),
  catchAsync(messageController.sendMessage),
);

messageRouter.get(
  "/seller/:conversationId",
  isSeller,
  catchAsync(messageController.getMessages),
);

messageRouter.get(
  "/user/:conversationId",
  isAuthenticated,
  catchAsync(messageController.getMessages),
);

export default messageRouter;
