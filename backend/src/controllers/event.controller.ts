import { Request, Response } from "express";
import { Event } from "../models/event.model.js";
import { createEventSchema } from "../schemas/event.schema.js";
import { AppError } from "../utils/AppError.js";
import { deleteMultipleFromCloudinary } from "../utils/deleteFile.js";

export const createEvent = async (req: Request, res: Response) => {
  const shop = req.user;
  if (!shop) throw new AppError("Please login to continue", 400);

  const result = createEventSchema.safeParse(req.body);
  const files = req.uploadedFiles;
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image.",
    });
  }

  if (!result.success) {
    await deleteMultipleFromCloudinary(files);
    throw new AppError(result.error.issues[0].message, 400);
  }

  try {
    const event = await Event.create({
      ...result.data,
      images: files,
      shop: shop._id,
      sold_out: 0,
    });

    return res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    await deleteMultipleFromCloudinary(files);
  }
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({
    endDate: { $gt: new Date() },
  })
    .populate("shop", "name avatar createdAt")
    .populate("reviews.user", "name avatar");

  return res.json({ success: true, events });
};

export const getShopEvents = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new AppError("Shop id is required", 400);

  const products = await Event.find({
    shop: id,
    endDate: { $gt: new Date() },
  }).populate("reviews.user", "avatar name");
  return res.json({ success: true, products });
};
