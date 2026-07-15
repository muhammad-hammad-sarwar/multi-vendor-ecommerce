import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import * as orderController from "../controllers/order.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.post("/", isAuthenticated, catchAsync(orderController.createOrder));

export default orderRouter;
