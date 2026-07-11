import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { createCouponSchema } from "../schemas/coupon.schema.js";
import { Coupon } from "../models/coupon.model.js";
import { Product } from "../models/product.model.js";

export const createCoupon = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue", 401);

  const { success, data, error } = createCouponSchema.safeParse(req.body);
  if (!success) throw new AppError(error?.issues?.[0].message, 400);

  const existingCoupon = await Coupon.findOne({
    name: data.name.trim().toUpperCase(),
  });

  if (existingCoupon) throw new AppError("Coupon name already exists.", 400);

  const selectedProduct = await Product.findById(data.product);
  if (!selectedProduct) throw new AppError("Product not found.", 404);

  if (selectedProduct.shop.toString() !== req.user._id.toString())
    throw new AppError(
      "You are not allowed to create a coupon for this product.",
      403,
    );

  if (new Date(data.expiryDate) < new Date())
    throw new AppError("Expiry date should be in future", 400);

  const coupon = await Coupon.create({
    ...data,
    name: data.name?.trim().toUpperCase(),
    shop: req.user?._id,
  });

  return res.status(201).json({
    success: true,
    message: "Coupon created successfully.",
    coupon,
  });
};
