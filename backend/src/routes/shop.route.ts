import { Router } from "express";
import * as shopController from "../controllers/shop.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import catchAsync from "../utils/catchAsync.js";

const shopRouter = Router();
shopRouter.post(
  "/sign-up",
  upload.single("avatar"),
  catchAsync(shopController.signUp),
);

shopRouter.post("/verify", catchAsync(shopController.verifyToken));
shopRouter.post("/login", catchAsync(shopController.login));
shopRouter.post(
  "/resend-verification",
  catchAsync(shopController.resendVerification),
);

shopRouter.get("/", catchAsync(shopController.loadShop));
shopRouter.post("/logout", catchAsync(shopController.logout));

export default shopRouter;
