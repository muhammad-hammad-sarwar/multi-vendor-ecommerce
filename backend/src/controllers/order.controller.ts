import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Order } from "../models/order.model.js";
import { CartProduct, Product } from "../models/product.model.js";

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
    // Total price per
    const totalPrice = data?.reduce(
      (sum: number, item: CartProduct) =>
        sum + (item?.discountPrice || item?.originalPrice) * item?.quantity,
      0,
    );

    // Update the sold out pieces of products
    for (const item of data) {
      await Product.updateOne(
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
    });
  }

  res
    .status(201)
    .json({ success: true, message: "Orderes create successfully" });
};
