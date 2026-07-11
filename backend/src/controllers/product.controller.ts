import { Request, Response } from "express";
import { createProductSchema } from "../schemas/product.schema.js";
import { Product } from "../models/product.model.js";
import { AppError } from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";

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
    products: await Product.find().populate("shop", "name avatar"),
  });
};

export const getShopProducts = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError("Shop id is required", 400);

  const products = await Product.find({ shop: id });
  return res.json({ success: true, products });
};
