import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Shop } from "../models/shop.model.js";
import jwt from "jsonwebtoken";

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

  req.user = await Shop.findById(decoded.shopId);

  next();
};

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.cookies?.seller_token)
    throw new AppError("You are not authorized.", 401);

  next();
};
