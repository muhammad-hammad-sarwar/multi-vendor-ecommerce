import { Router } from "express";
import * as withdrawController from "../controllers/withdraw.controller.js";
import catchAsync from "../utils/catchAsync.js";
import { isAdmin, isSeller } from "../middlewares/auth.js";

const withdrawRouter = Router();
withdrawRouter.post(
  "/",
  isSeller,
  catchAsync(withdrawController.createWithdrawRequest),
);

withdrawRouter.get(
  "/",
  isAdmin,
  catchAsync(withdrawController.getWithdrawRequests),
);

withdrawRouter.get(
  "/seller",
  isSeller,
  catchAsync(withdrawController.getSellerWithdrawRequests),
);

withdrawRouter.patch(
  "/:id/approve",
  isAdmin,
  catchAsync(withdrawController.approveWithdrawRequest),
);

export default withdrawRouter;
