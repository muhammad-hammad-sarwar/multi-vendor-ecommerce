import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { Event as EventModel } from "../models/event.model.js";
import { User } from "../models/user.model.js";

export const createOrder = async (req: Request, res: Response) => {
  const { cart, shippingInfo, totalPrice, paymentInfo } = req.body;
  if (!cart || !shippingInfo || !totalPrice || !paymentInfo)
    throw new AppError(
      "Cart, Shipping Address, Total price and Payment info are required",
      400,
    );

  if (!Array.isArray(cart)) throw new AppError("Cart is not valid", 400);
  // Differentiate products by shop
  const user = req.user;
  const shopMap = new Map();
  for (const item of cart) {
    const shopId = item?.shop?._id;
    if (!shopMap.has(shopId)) {
      shopMap.set(shopId, []);
    }

    shopMap.get(shopId).push(item);
  }

  //   Place order in each shop
  for (const [shopId, data] of shopMap) {
    let totalPrice = 0;
    const validatedCart = [];

    for (const item of data) {
      const product = item.isEvent
        ? await EventModel.findById(item._id)
        : await Product.findById(item._id);

      if (!product) {
        throw new AppError(`${item.name} no longer exists`, 400);
      }

      const availableStock = product.stock - product.sold_out;
      if (item.quantity > availableStock) {
        throw new AppError(
          `${product.name} only has ${availableStock} left in stock`,
          400,
        );
      }

      const price = product.discountPrice ?? product.originalPrice;
      totalPrice += price * item.quantity;

      validatedCart.push({
        ...item,
        discountPrice: product.discountPrice,
        originalPrice: product.originalPrice,
      });
    }

    // Update the sold out pieces of products
    for (const item of validatedCart) {
      item.isEvent
        ? await EventModel.updateOne(
            { _id: item?._id },
            { $inc: { sold_out: item?.quantity } },
          )
        : await Product.updateOne(
            { _id: item?._id },
            { $inc: { sold_out: item?.quantity } },
          );
    }

    await Order.create({
      cart: data,
      shippingInfo,
      totalPrice,
      paymentInfo,
      user,
      shop: shopId,
    });
  }

  res
    .status(201)
    .json({ success: true, message: "Orderes create successfully" });
};

export const getSellerOrders = async (req: Request, res: Response) => {
  const shop = req.user;
  if (!shop) throw new AppError("Please login to continue", 400);

  const orders = await Order.find({
    "cart.shop._id": shop._id.toString(),
  }).sort({
    createdAt: -1,
  });

  return res.json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
};

export const updateStatus = async (req: Request, res: Response) => {
  const shop = req.user;
  if (!shop || shop.role != "seller")
    throw new AppError("Please login to continue", 401);
  const admin = await User.findOne({ role: "admin" });
  if (!admin) throw new AppError("Admin is Unavailable", 400);

  const { orderId, status } = req.params;
  if (!orderId || !status)
    throw new AppError("Order Id and status are required", 400);

  if (status != "Delivered" && status != "On the way")
    throw new AppError("Status is not valid", 400);

  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order does not exist", 400);

  if (order.shop && order.shop.toString() != shop._id.toString())
    throw new AppError("You are not authorized to change status", 401);

  if (order.status == status)
    throw new AppError(`Order is already ${status}`, 400);

  if (status == "Delivered") {
    order.deliveredAt = new Date();
    if (order.paymentInfo) order.paymentInfo.status = "succedded";
    // Add to seller account
    const sellerShare = +(order.totalPrice * 0.9).toFixed(2);
    shop.availableBalance += sellerShare;
    // admin.availableBalance += order.totalPrice;
  }

  order.status = status;
  Promise.all([await order.save(), await shop.save(), await admin.save()]);

  return res.json({
    success: true,
    message: "Status Updated successfully",
    shop,
  });
};

export const getUserOrders = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new AppError("Please login to continue", 400);

  const orders = await Order.find({ "user._id": user._id }).sort({
    createdAt: -1,
  });

  return res.json({
    success: true,
    message: "Orders fetched successfully",
    orders,
  });
};

export const processRefund = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new AppError("Please login to continue", 401);

  const { orderId } = req.params;
  if (!orderId) throw new AppError("Order Id is required", 400);

  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order does not exist", 400);

  if (order.user?._id.toString() != user._id.toString())
    throw new AppError("You are not authorized to change status", 401);

  if (order.status != "Delivered")
    throw new AppError("Refund Processing will start after Delivery", 400);

  order.status = "Refund Processing";
  await order.save();

  res.json({ success: true, message: "Refund Processing start Successfully" });
};

export const grantRefund = async (req: Request, res: Response) => {
  const shop = req.user;
  if (!shop || shop.role != "seller")
    throw new AppError("Please login to continue", 401);
  const { orderId } = req.params;
  if (!orderId) throw new AppError("Order Id is required", 400);

  const order = await Order.findById(orderId);
  if (!order) throw new AppError("Order does not exist", 400);

  if (order.shop && order.shop.toString() != shop._id.toString())
    throw new AppError("You are not authorized to change status", 401);

  if (order.status != "Refund Processing")
    throw new AppError(
      "Please Refund Processing should start first then grant",
      400,
    );

  const shopMap = new Map();
  for (const item of order.cart) {
    const shopId = item?.shop?._id;
    if (!shopMap.has(shopId)) {
      shopMap.set(shopId, []);
    }

    shopMap.get(shopId).push(item);
  }
  for (const [_, data] of shopMap) {
    for (const item of data) {
      await Product.updateOne(
        { _id: item?._id },
        { $inc: { sold_out: -item?.quantity } },
      );
    }
  }

  order.status = "Refund Success";
  shop.availableBalance -= order.totalPrice * 0.9;
  // admin.availableBalance -= order.totalPrice;
  Promise.all([await order.save(), await shop.save()]);

  return res.json({
    success: true,
    message: "Refund Granted successfully",
    shop,
  });
};
