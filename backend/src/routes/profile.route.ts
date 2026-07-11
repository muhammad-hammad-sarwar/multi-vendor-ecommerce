import { Router } from "express";
import * as profileController from "../controllers/profile.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated } from "../middlewares/auth.js";

const profileRouter = Router();

profileRouter.put(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  catchAsync(profileController.updateProfileAvatar),
);

profileRouter.put(
  "/",
  isAuthenticated,
  catchAsync(profileController.updateProfile),
);

profileRouter.put(
  "/password",
  isAuthenticated,
  catchAsync(profileController.updateProfilePassword),
);

export default profileRouter;
