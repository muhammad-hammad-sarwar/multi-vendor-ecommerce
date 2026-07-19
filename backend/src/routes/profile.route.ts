import { Router } from "express";
import * as profileController from "../controllers/profile.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import catchAsync from "../utils/catchAsync.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.js";

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

profileRouter.put(
  "/addresses",
  isAuthenticated,
  catchAsync(profileController.updateProfileAddresses),
);

profileRouter.delete(
  "/addresses/:id",
  isAuthenticated,
  catchAsync(profileController.deleteUserAddress),
);

export default profileRouter;
