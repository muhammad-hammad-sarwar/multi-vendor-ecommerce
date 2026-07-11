import { Router } from "express";
import * as couponController from "../controllers/coupon.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isSeller } from "../middlewares/auth.js";

const couponRouter = Router();

couponRouter.post("/", isSeller, catchAsync(couponController.createCoupon));

export default couponRouter;
