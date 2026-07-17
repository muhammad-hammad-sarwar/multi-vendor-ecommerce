import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import * as orderController from "../controllers/order.controller.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.post("/", isAuthenticated, catchAsync(orderController.createOrder));
orderRouter.get(
  "/seller",
  isSeller,
  catchAsync(orderController.getSellerOrders),
);

orderRouter.patch(
  "/seller/:orderId/:status",
  isSeller,
  catchAsync(orderController.updateStatus),
);

orderRouter.get(
  "/user",
  isAuthenticated,
  catchAsync(orderController.getUserOrders),
);

export default orderRouter;
