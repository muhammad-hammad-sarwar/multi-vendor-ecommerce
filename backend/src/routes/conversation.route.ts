import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import * as conversationController from "../controllers/conversation.controller.js";
import { isLoggedIn } from "../middlewares/auth.js";

const conversationRouter = Router();

conversationRouter.post(
  "/",
  isLoggedIn, // If seller or user
  catchAsync(conversationController.createConversation),
);

conversationRouter.get(
  "/",
  isLoggedIn, // If seller or user
  catchAsync(conversationController.getAllConversations),
);

export default conversationRouter;
