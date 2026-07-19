import { Request, Response } from "express";
import { createProductSchema } from "../schemas/product.schema.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";
import { Order } from "../models/order.model.js";
import { Event } from "../models/event.model.js";

export const createProduct = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  try {
    const result = createProductSchema.safeParse(req.body);

    if (!files || files.length === 0)
      throw new AppError("Please upload at least one image.", 400);

    if (!result.success) {
      // Delete Product images
      files.forEach((file) => deleteFile(file.filename));

      return res.status(400).json({
        success: false,
        message: result.error.issues[0]?.message,
      });
    }

    if (!req.user) {
      // Delete Product images
      files.forEach((file) => deleteFile(file.filename));
      throw new AppError("Please login to continue.", 401);
    }

    const images = files.map((file) => file.filename);

    const product = await Product.create({
      ...result.data,
      images,
      shop: req?.user._id,
      sold_out: 0,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    // deleting files
    files?.forEach((file) => deleteFile(file.filename));
  }
};

export const getProducts = async (req: Request, res: Response) => {
  return res.json({
    products: await Product.find()
      .populate("shop", "name avatar createdAt")
      .populate("reviews.user", "avatar name"),
  });
};

export const getShopProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError("Shop id is required", 400);

  const products = await Product.find({ shop: id }).populate(
    "reviews.user",
    "avatar name",
  );
  return res.json({ success: true, products });
};

export const createReview = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) throw new AppError("Please login to continue", 400);
  const { productId, rating, comment, orderId, isEvent } = req.body;

  if (!productId || !rating || !comment || isNaN(Number(rating)))
    throw new AppError("Product id, rating and comment are required", 400);

  const product = isEvent
    ? await Event.findOne({ _id: productId })
    : await Product.findOne({ _id: productId });

  if (!product) throw new AppError("Product does not exists", 400);

  const review = { rating: Number(rating), comment, user: user._id };
  const doesExist = product?.reviews?.find(
    (r) => r?.user.toString() == user._id.toString(),
  );
  if (doesExist) throw new AppError("Review already exists", 400);

  product?.reviews.push(review);
  product.ratings =
    product.reviews.reduce((sum, review) => sum + review.rating, 0) /
    product.reviews.length;

  await product.save();

  // now save isReviewed in order
  await Order.updateOne(
    {
      _id: orderId,
      "cart._id": productId,
    },
    {
      $set: {
        "cart.$.isReviewed": true,
      },
    },
  );

  res.json({ success: true, message: "Review added successfully" });
};
