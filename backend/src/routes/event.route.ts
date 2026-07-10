import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import * as eventController from "../controllers/event.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isSeller } from "../middlewares/auth.js";

const eventRouter = Router();

eventRouter.post(
  "/",
  isSeller,
  upload.array("images"),
  catchAsync(eventController.createEvent),
);

export default eventRouter;
