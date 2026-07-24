import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.js";
import upload from "../middlewares/upload.middleware.js";
import cloudinaryUpload from "../middlewares/cloudinary.upload.js";

const productRouter = Router();

productRouter.post(
  "/",
  isSeller,
  upload.array("images"),
  cloudinaryUpload("products"),
  catchAsync(productController.createProduct),
);

productRouter.get("/", catchAsync(productController.getProducts));
// Get products by shop id
productRouter.get("/shop/:id", catchAsync(productController.getShopProducts));
productRouter.post(
  "/review",
  isAuthenticated,
  catchAsync(productController.createReview),
);

export default productRouter;
