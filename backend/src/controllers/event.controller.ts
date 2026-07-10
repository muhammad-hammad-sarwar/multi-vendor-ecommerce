import { Request, Response } from "express";
import { Event } from "../models/event.model.js";
import { createEventSchema } from "../schemas/event.schema.js";

export const createEvent = async (req: Request, res: Response) => {
  const result = createEventSchema.safeParse(req.body);
  console.log(result.data?.name, result.data?.endDate);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.issues[0]?.message,
    });
  }

  //   if(startDate)

  const files = req.files as Express.Multer.File[];

  if (!files || files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please upload at least one image.",
    });
  }

  const images = files.map((file) => file.filename);

  const event = await Event.create({
    ...result.data,
    images,
    shop: req.user._id,
    sold_out: 0,
  });

  return res.status(201).json({
    success: true,
    event,
  });
};
