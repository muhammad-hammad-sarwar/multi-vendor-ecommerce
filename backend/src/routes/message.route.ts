import { Router } from "express";
import * as messageController from "../controllers/message.controller.js";
import { isLoggedIn } from "../middlewares/auth.js";
import catchAsync from "../utils/catchAsync.js";
import { upload } from "../middlewares/upload.middleware.js";
const messageRouter = Router();

messageRouter.post(
  "/:conversationId",
  isLoggedIn,
  upload.array("images"),
  catchAsync(messageController.sendMessage),
);

messageRouter.get(
  "/:conversationId",
  isLoggedIn,
  catchAsync(messageController.getMessages),
);

export default messageRouter;
