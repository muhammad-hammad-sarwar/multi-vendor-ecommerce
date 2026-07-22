import { Router } from "express";
import * as shopController from "../controllers/shop.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import { isSeller } from "../middlewares/auth.js";
import { updateProfileAvatar } from "../controllers/profile.controller.js";

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

shopRouter.put(
  "/avatar",
  isSeller,
  upload.single("avatar"),
  catchAsync(updateProfileAvatar),
);

shopRouter.put("/profile", isSeller, catchAsync(shopController.updateProfile));

// Get shop info by id
shopRouter.get("/info/:id", catchAsync(shopController.getShopInfo));

// For logged in sellers - get shop products
shopRouter.get("/products", isSeller, shopController.getShopProducts);
shopRouter.get("/events", isSeller, shopController.getShopEvents);

shopRouter.delete("/products/:id", isSeller, shopController.deleteProductById);
shopRouter.delete("/events/:id", isSeller, shopController.deleteEventById);

// Withdrawal method
shopRouter.post(
  "/withdraw",
  isSeller,
  catchAsync(shopController.addWithdrawMethod),
);

shopRouter.delete(
  "/withdraw/:id",
  isSeller,
  catchAsync(shopController.deleteWithdrawMethod),
);

export default shopRouter;
