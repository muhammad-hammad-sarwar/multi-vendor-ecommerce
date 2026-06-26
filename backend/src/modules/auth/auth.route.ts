import { Router } from "express";
import * as authController from "./auth.controller.js";
import * as authSchema from "./auth.validator.js";
import catchAsync from "../../utils/catchAsync.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../middlewares/upload.middleware.js";

const authRouter = Router();
authRouter.post(
  "/sign-up",
  upload.single("avatar"),
  catchAsync(authController.signUp),
);

authRouter.post("/verify", catchAsync(authController.verifyToken));

authRouter.post(
  "/login",
  validate(authSchema.loginSchema),
  catchAsync(authController.login),
);

authRouter.post(
  "/resend-verification",
  catchAsync(authController.resendVerification),
);

authRouter.get("/me", catchAsync(authController.loadUser));
authRouter.post("/logout", catchAsync(authController.logout));

export default authRouter;
