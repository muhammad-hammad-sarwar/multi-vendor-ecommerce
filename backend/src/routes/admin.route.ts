import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import { isAdmin } from "../middlewares/auth.js";
import * as adminController from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(isAdmin);

// Dashboard
adminRouter.get("/dashboard", catchAsync(adminController.getDashboard));

// Orders
adminRouter.get("/orders", catchAsync(adminController.getOrders));
adminRouter.patch("/orders/:id", catchAsync(adminController.updateOrder));

// Users
adminRouter.get("/users", catchAsync(adminController.getUsers));
adminRouter.patch("/users/:id", catchAsync(adminController.updateUser));
adminRouter.delete("/users/:id", catchAsync(adminController.deleteUser));

// Sellers
adminRouter.get("/sellers", catchAsync(adminController.getSellers));
adminRouter.patch("/sellers/:id", catchAsync(adminController.updateSeller));
adminRouter.delete("/sellers/:id", catchAsync(adminController.deleteSeller));

// Products
adminRouter.get("/products", catchAsync(adminController.getProducts));
adminRouter.delete("/products/:id", catchAsync(adminController.deleteProduct));

// Events
adminRouter.get("/events", catchAsync(adminController.getEvents));
adminRouter.delete("/events/:id", catchAsync(adminController.deleteEvent));

// Withdrawals
adminRouter.get("/withdrawals", catchAsync(adminController.getWithdrawals));
adminRouter.patch(
  "/withdrawals/:id",
  catchAsync(adminController.updateWithdrawal),
);

// Settings
adminRouter.get("/settings", catchAsync(adminController.getSettings));
adminRouter.patch("/settings", catchAsync(adminController.updateSettings));

export default adminRouter;
