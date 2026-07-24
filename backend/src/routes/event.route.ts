import { Router } from "express";
import * as eventController from "../controllers/event.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isSeller } from "../middlewares/auth.js";
import upload from "../middlewares/upload.middleware.js";
import cloudinaryUpload from "../middlewares/cloudinary.upload.js";

const eventRouter = Router();

eventRouter.post(
  "/",
  isSeller,
  upload.array("images"),
  cloudinaryUpload("events"),
  catchAsync(eventController.createEvent),
);

eventRouter.get("/shop/:id", catchAsync(eventController.getShopEvents));
// Get All Events
eventRouter.get("/", catchAsync(eventController.getEvents));

export default eventRouter;
