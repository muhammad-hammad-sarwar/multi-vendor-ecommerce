import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated } from "../middlewares/auth.js";

const authRouter = Router();
authRouter.post(
  "/sign-up",
  upload.single("avatar"),
  catchAsync(authController.signUp),
);

authRouter.post("/verify", catchAsync(authController.verifyToken));
authRouter.post("/login", catchAsync(authController.login));
authRouter.post(
  "/resend-verification",
  catchAsync(authController.resendVerification),
);

authRouter.get("/me", catchAsync(authController.loadUser));
authRouter.post("/logout", catchAsync(authController.logout));

export default authRouter;
