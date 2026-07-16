import { Request, Response } from "express";
import { Event } from "../models/event.model.js";
import { createEventSchema } from "../schemas/event.schema.js";
import { AppError } from "../utils/AppError.js";
import { deleteFile } from "../utils/deleteFile.js";

export const createEvent = async (req: Request, res: Response) => {
  const shop = req.user;
  if (!shop) throw new AppError("Please login to continue", 400);

  const result = createEventSchema.safeParse(req.body);
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image.",
    });
  }

  if (!result.success) {
    files.forEach((file) => deleteFile(file.filename));
    return res.status(400).json({
      success: false,
      message: result.error.issues[0]?.message,
    });
  }

  const images = files.map((file) => file.filename);
  try {
    const event = await Event.create({
      ...result.data,
      images,
      shop: shop._id,
      sold_out: 0,
    });

    return res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    files.forEach((file) => deleteFile(file.filename));
  }
};

export const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({
    endDate: { $gt: new Date() },
  }).populate("shop", "name avatar");

  return res.json({ success: true, events });
};
