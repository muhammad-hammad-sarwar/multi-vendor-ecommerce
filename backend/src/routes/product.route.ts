import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import * as productController from "../controllers/product.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isSeller } from "../middlewares/auth.js";

const productRouter = Router();

productRouter.post(
  "/",
  isSeller,
  upload.array("images"),
  catchAsync(productController.createProduct),
);

productRouter.get("/", catchAsync(productController.getProducts));

export default productRouter;
