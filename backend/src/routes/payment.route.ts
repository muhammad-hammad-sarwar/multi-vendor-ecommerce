import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import * as paymentController from "../controllers/payment.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";
const paymentRouter = Router();

paymentRouter.post(
  "/process",
  catchAsync(paymentController.createPaymentIntent),
);
paymentRouter.get(
  "/api-key",
  isAuthenticated,
  catchAsync(paymentController.getApiKey),
);

export default paymentRouter;
