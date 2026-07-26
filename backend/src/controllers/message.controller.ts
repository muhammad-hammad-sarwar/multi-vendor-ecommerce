import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) throw new AppError("Please login to continue chatting", 400);
  const { conversationId } = req.params;
  const { text } = req.body;

  if (!text?.trim() && !req?.uploadedFiles?.[0]?.url)
    return next(new AppError("Message cannot be empty", 400));

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return next(new AppError("Conversation not found", 404));
  }

  if (
    req.user._id.toString() != conversation.seller.toString() &&
    req.user._id.toString() != conversation.user.toString()
  )
    throw new AppError("Unauthorized", 403);

  const message = await Message.create({
    conversation: conversation._id,
    sender: req.user._id,
    senderModel: req.user.role === "user" ? "user" : "shop",
    text: text?.trim(),
    image: req?.uploadedFiles?.[0],
  });

  conversation.lastMessage = message.text;
  conversation.lastMessageAt = message.createdAt;

  await conversation.save();

  res.status(201).json({
    success: true,
    message,
  });
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) throw new AppError("Please login to continue chatting", 401);

  const { conversationId } = req.params;
  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    return next(new AppError("Conversation not found", 404));
  }

  const _id = req.user._id;

  if (
    _id.toString() != conversation.seller.toString() &&
    _id.toString() != conversation.user.toString()
  )
    throw new AppError("Unauthorized", 403);

  const messages = await Message.find({
    conversation: conversation._id,
  }).sort({ createdAt: 1 });

  res.status(200).json({
    success: true,
    messages,
  });
};
