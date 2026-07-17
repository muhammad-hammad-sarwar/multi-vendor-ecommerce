import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import * as productController from "../controllers/product.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post(
  "/",
  isSeller,
  upload.array("images"),
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
