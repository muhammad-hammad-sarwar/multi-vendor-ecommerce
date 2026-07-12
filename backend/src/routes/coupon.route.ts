import { Router } from "express";
import * as couponController from "../controllers/coupon.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.js";

const couponRouter = Router();

couponRouter.post("/", isSeller, catchAsync(couponController.createCoupon));
couponRouter.post(
  "/apply",
  isAuthenticated,
  catchAsync(couponController.applyCoupon),
);

export default couponRouter;
