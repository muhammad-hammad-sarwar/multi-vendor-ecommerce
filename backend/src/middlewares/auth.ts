import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Shop } from "../models/shop.model.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const isSeller = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.seller_token;
  if (!token) throw new AppError("You are not authorized.", 401);

  // If this user has stored id in db
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    shopId: string;
  };

  if (!decoded?.shopId) throw new AppError("Invalid token", 401);

  const shop = await Shop.findById(decoded.shopId).select("+isVerified");
  if (!shop) throw new AppError("Shop does not exist", 404);

  if (!shop.isVerified)
    throw new AppError("Please verify your email to continue", 401);

  req.user = shop;

  next();
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.cookies?.token) throw new AppError("You are not authorized.", 401);

  const decoded = jwt.verify(
    req.cookies?.token,
    process.env.JWT_SECRET as string,
  ) as {
    userId: string;
  };

  if (!decoded?.userId) throw new AppError("Invalid token", 401);
  const user = await User.findById(decoded?.userId).select("+isVerified");

  if (!user) throw new AppError("User does not exist", 404);

  if (!user.isVerified)
    throw new AppError("Please verify your email to continue", 401);

  req.user = user;

  next();
};

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // User
    if (req.cookies?.token) {
      const decoded = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET as string,
      ) as { userId: string };

      const user = await User.findById(decoded.userId).select("+isVerified");

      if (user && user.isVerified) {
        req.user = user;
        return next();
      }
    }

    // Seller
    if (req.cookies?.seller_token) {
      const decoded = jwt.verify(
        req.cookies.seller_token,
        process.env.JWT_SECRET as string,
      ) as { shopId: string };

      const shop = await Shop.findById(decoded.shopId).select("+isVerified");

      if (shop && shop.isVerified) {
        req.user = shop;
        return next();
      }
    }

    throw new AppError("You are not authorized.", 401);
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.cookies?.token) throw new AppError("You are not authorized.", 401);

  const decoded = jwt.verify(
    req.cookies?.token,
    process.env.JWT_SECRET as string,
  ) as {
    userId: string;
  };

  if (!decoded?.userId) throw new AppError("Invalid token", 401);
  const user = await User.findById(decoded?.userId).select("+isVerified");

  if (!user) throw new AppError("User does not exist", 404);

  if (!user.isVerified)
    throw new AppError("Please verify your email to continue", 401);

  if (user.role != "admin") throw new AppError("Unauthorized", 403);

  req.user = user;

  next();
};
