import { Request, Response } from "express";
import { Order } from "../models/order.model.js";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";
import { Shop } from "../models/shop.model.js";
import { Product } from "../models/product.model.js";
import { Event } from "../models/event.model.js";
import { deleteFile } from "../utils/deleteFile.js";

export const getDashboard = async (req: Request, res: Response) => {};

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({}).sort({ deliveredAt: -1, createdAt: -1 });
  res.json({ success: true, orders });
};

export const updateOrder = async (req: Request, res: Response) => {};

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({})
    .sort({ createdAt: -1 })
    .select("+isVerified");
  res.json({ success: true, users });
};

export const updateUser = async (req: Request, res: Response) => {};

export const deleteUser = async (req: Request, res: Response) => {};

export const getSellers = async (req: Request, res: Response) => {
  const shops = await Shop.find({})
    .sort({ createdAt: -1 })
    .select("+isVerified");
  res.json({ success: true, sellers: shops });
};

export const updateSeller = async (req: Request, res: Response) => {};

export const deleteSeller = async (req: Request, res: Response) => {};

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.find({}).sort({ createdAt: -1, ratings: -1 });
  res.json({ success: true, products });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError("Product id is required", 400);

  const product = await Product.findById(id);
  if (!product) throw new AppError("Product does not exists", 404);

  const images = product.images;
  images.forEach((img) => deleteFile(img));

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({}).sort({ startDate: -1, endDate: -1 });
  res.json({ success: true, events });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError("Event id is required", 400);

  const event = await Event.findById(id);
  if (!event) throw new AppError("Event does not exists", 404);

  const images = event.images;
  images.forEach((img) => deleteFile(img));

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
};

export const getWithdrawals = async (req: Request, res: Response) => {};

export const updateWithdrawal = async (req: Request, res: Response) => {};

export const getSettings = async (req: Request, res: Response) => {};

export const updateSettings = async (req: Request, res: Response) => {};
