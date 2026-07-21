import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Conversation } from "../models/conversation.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

export const createConversation = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue", 400);

  const { userId, sellerId } = req.body;
  if (!userId || !sellerId)
    throw new AppError("Seller Id and User Id are required", 400);

  const seller = await Shop.findById(sellerId);
  const user = await User.findById(userId);

  if (!user) throw new AppError("User does not exists", 404);
  if (!seller) throw new AppError("Seller does not exists", 404);

  if (req.user._id != sellerId && req.user._id != userId)
    throw new AppError("Unauthorized", 401);

  const conversation = await Conversation.findOne({
    seller: sellerId,
    user: userId,
  })
    .populate("user", "name avatar")
    .populate("seller", "name avatar");
  if (conversation) {
    return res.json({
      success: true,
      message: "Conversation already exists",
      conversation,
    });
  }

  const newConversation = await Conversation.create({
    seller: seller._id,
    user: user._id,
  });

  await newConversation.populate([
    {
      path: "user",
      select: "name avatar",
    },
    {
      path: "seller",
      select: "name avatar",
    },
  ]);

  return res.status(201).json({
    success: true,
    message: "Conversation created successfully",
    conversation: newConversation,
  });
};

export const getAllConversations = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue", 400);

  const filter =
    req.user.role === "seller"
      ? { seller: req.user._id }
      : { user: req.user._id };

  const conversations = await Conversation.find(filter)
    .sort({ lastMessageAt: -1 })
    .populate("user", "name avatar")
    .populate("seller", "name avatar");

  res.json({
    success: true,
    message: "Conversations fetched successfully",
    conversations,
  });
};
