import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { createCouponSchema } from "../schemas/coupon.schema.js";
import { Coupon } from "../models/coupon.model.js";
import { IProduct, Product } from "../models/product.model.js";

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

export const applyCoupon = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue.", 401);

  const { couponCode, cart } = req.body; // cart = Product[]
  if (!couponCode || !Array.isArray(cart) || cart?.length == 0)
    throw new AppError("Cart and Coupon code are required", 400);

  const findCoupon = await Coupon.findOne({ name: couponCode });
  if (!findCoupon) throw new AppError("Coupon Code does not Exist", 400);

  if (new Date(findCoupon?.expiryDate) < new Date())
    throw new AppError("Coupon has expired.", 400);

  console.log("find coupon product id", findCoupon);
  const product = await Product.findById(findCoupon?.product);

  if (!product) throw new AppError("Product no longer exists.", 404);

  const eligibleProduct = cart?.find(
    (p: IProduct) => p?._id?.toString() == product?._id?.toString(),
  );

  if (!eligibleProduct)
    throw new AppError(
      "Coupon is not applicable to any product in your cart.",
      400,
    );

  const availableStock = product.stock - product.sold_out;
  if (eligibleProduct?.quantity > availableStock)
    throw new AppError(
      `Only ${availableStock} item(s) of ${product.name} are available.`,
      400,
    );

  const totalPrice =
    (product?.discountPrice || product?.originalPrice) *
    eligibleProduct?.quantity;

  if (totalPrice < findCoupon?.minimumPurchaseAmount)
    throw new AppError(
      `Coupon's minimum purchase amount is USD$ ${findCoupon?.minimumPurchaseAmount}`,
      400,
    );

  let discount = (findCoupon?.discountPercentage / 100) * totalPrice;
  if (
    findCoupon?.maximumDiscountAmount &&
    discount > findCoupon.maximumDiscountAmount
  ) {
    discount = findCoupon.maximumDiscountAmount;
  }

  return res.json({
    success: true,
    discount,
    appliedProduct: product?._id,
    couponCode: findCoupon?.name,
    message: "Coupon applied successfully.",
  });
};
