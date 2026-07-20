import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { createCouponSchema } from "../schemas/coupon.schema.js";
import { Coupon } from "../models/coupon.model.js";
import { IProduct, Product } from "../models/product.model.js";

export const createCoupon = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue", 401);
  const {
    discountPercentage,
    name,
    maximumDiscountAmount,
    product,
    expiryDate,
  } = req.body;

  if (
    !discountPercentage ||
    !name ||
    !maximumDiscountAmount ||
    !product ||
    !expiryDate
  )
    throw new AppError("All fields are reqired", 400);

  // const { success, data, error } = createCouponSchema.safeParse(req.body);
  // if (!success) throw new AppError(error?.issues?.[0].message, 400);
  console.log("pass");

  const existingCoupon = await Coupon.findOne({
    name: name.trim().toUpperCase(),
    shop: req.user._id,
  });

  if (existingCoupon) throw new AppError("Coupon name already exists.", 400);

  const selectedProduct = await Product.findById(product);
  if (!selectedProduct) throw new AppError("Product not found.", 404);

  if (selectedProduct.shop.toString() !== req.user._id.toString())
    throw new AppError(
      "You are not allowed to create a coupon for this product.",
      403,
    );

  if (new Date(expiryDate) < new Date())
    throw new AppError("Expiry date should be in future", 400);

  const coupon = await Coupon.create({
    discountPercentage,
    name: name.trim().toUpperCase(),
    maximumDiscountAmount,
    product,
    expiryDate,
    shop: req.user._id,
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

  let discount = (findCoupon.discountPercentage * totalPrice) / 100;

  if (
    findCoupon.maximumDiscountAmount &&
    discount > findCoupon.maximumDiscountAmount
  ) {
    discount = findCoupon.maximumDiscountAmount;
  }

  return res.json({
    success: true,
    message: "Coupon applied successfully.",
    coupon: findCoupon,
    discount,
  });
};

export const getCoupons = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue", 401);
  const coupons = await Coupon.find({
    shop: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Coupons fetched successfully.",
    coupons,
  });
};

export const deleteCouponById = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue.", 401);
  const { id } = req.params;
  if (!id) throw new AppError("Coupon id is required", 400);
  const coupon = await Coupon.findById(id);
  console.log(`ID = ${id}, COUPON = ${coupon}`);
  if (!coupon) throw new AppError("Coupon does not exist", 400);

  if (coupon.shop.toString() != req?.user?._id.toString())
    throw new AppError("You are Not Authorized to delete the Coupon", 401);

  await Coupon.deleteOne({ _id: id });
  const coupons = await Coupon.find({ shop: req.user._id });

  return res.json({
    success: true,
    message: `Coupon with id ${id} deleted successfully`,
    coupons,
  });
};
