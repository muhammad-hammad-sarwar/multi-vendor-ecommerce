import { Request, Response } from "express";
import { createProductSchema } from "../schemas/product.schema.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";

export const createProduct = async (req: Request, res: Response) => {
  const result = createProductSchema.safeParse(req.body);

  if (!result.success) {
    // Delete Product images
    return res.status(400).json({
      success: false,
      message: result.error.issues[0]?.message,
    });
  }

  if (!req.user) {
    // Delete Product images
    throw new AppError("Please login to continue.", 401);
  }

  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image.",
    });
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
};

export const getProducts = async (req: Request, res: Response) => {
  return res.json({
    products: await Product.find().populate("shop", "name avatar"),
  });
};
