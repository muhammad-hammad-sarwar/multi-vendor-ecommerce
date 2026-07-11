import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Shop } from "../models/shop.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { deleteFile } from "../utils/deleteFile.js";
import { shopSchema } from "../schemas/shop.schema.js";
import { Product } from "../models/product.model.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { success, error, data } = shopSchema.safeParse(req.body);
  if (!success) throw new AppError(`${error.issues[0]?.message}`, 400);
  const shop = await Shop.findOne({ email: data.email });
  if (shop) {
    // Delete the shop avatar
    req.file?.filename && deleteFile(req.file?.filename);
    throw new AppError("shop with this email already exists", 409);
  }

  // hash password using 10 Salt Round
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const verifyTokenHashUUID = crypto.randomUUID();
  const verifyTokenHash = await bcrypt.hash(verifyTokenHashUUID, 10);
  const verifyTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const avatar = req.file?.filename;
  const newShop = await Shop.create({
    ...data,
    avatar,
    password: hashedPassword,
    verifyTokenHash,
    verifyTokenExpiry,
  });

  // Add to queue(background)

  try {
    await sendEmail(
      data.email,
      `http://localhost:3000/verify?uid=${newShop._id}&seller_token=${verifyTokenHashUUID}`,
    );
  } catch (error) {
    throw new AppError("Error sending email: Please retry Verification", 500);
  }

  res.status(201).json({
    success: true,
    message: `Email verification sent to ${data.email}`,
  });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { uid, seller_token: token } = req.body;
  const shop = await Shop.findOne({ _id: uid });
  if (!shop) throw new AppError("Shop does not Exist", 404);

  const verifyTokenExpiry = shop.verifyTokenExpiry;
  if (verifyTokenExpiry <= new Date())
    throw new AppError("Verification token expired", 400);
  const isSame = await bcrypt.compare(token, shop.verifyTokenHash);
  if (!isSame) throw new AppError("Token is not valid", 401);

  if (shop.isVerified)
    throw new AppError(
      "You are already verified. Please login to continue",
      400,
    );

  shop.isVerified = true;
  await shop.save();

  res.json({
    success: true,
    message: "You have successfully Registered. Please login to continue",
  });
};

export const resendVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  const shop = await Shop.findOne({ email });
  if (!shop) throw new AppError("User not found", 404);

  if (shop.isVerified) {
    throw new AppError("User already verified", 400);
  }

  const verifyTokenHash = crypto.randomUUID();
  const hashedToken = await bcrypt.hash(verifyTokenHash, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  shop.verifyTokenHash = hashedToken;
  shop.verifyTokenExpiry = expiry;

  await shop.save();

  try {
    await sendEmail(
      shop.email,
      `http://localhost:3000/verify?uid=${shop._id}&seller_token=${verifyTokenHash}`,
    );
  } catch (error) {
    throw new AppError(
      "Failed to send verification email. Please try again",
      500,
    );
  }

  res.json({
    success: true,
    message: "Verification email sent",
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const shop = await Shop.findOne({ email }).select("+password");
  if (!shop) throw new AppError("Shop not found", 404);

  const isSame = await bcrypt.compare(password, shop.password);
  if (!isSame) throw new AppError("Password is incorrect", 401);

  const token = jwt.sign({ shopId: shop._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });

  const { password: _, ...safeShop } = shop.toObject();
  // lax means different domains for frontend and backend
  res
    .cookie("seller_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({
      success: true,
      message: "Welcome back",
      shopId: shop._id,
      shop: safeShop,
    });
};

export const loadShop = async (req: Request, res: Response) => {
  const token = req.cookies?.seller_token;

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    shopId: string;
  };

  const shop = await Shop.findById(decoded.shopId);
  if (!shop) throw new AppError("Shop does not Exist", 404);

  res.status(200).json({
    success: true,
    shop,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("seller_token");

  res.json({ success: true, message: "Logged out successfully" });
};

export const getShopProducts = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue.", 401);
  return res.json({
    success: true,
    products: await Product.find({ shop: req.user?._id }),
  });
};

export const deleteProductById = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Please login to continue.", 401);
  const { id } = req.params;
  if (!id) throw new AppError("Product id is required", 400);
  const product = await Product.findById(id);
  if (!product) throw new AppError("Product does not exist", 400);

  if (product.shop.toString() != req?.user?._id.toString())
    throw new AppError("You are Not Authorized to delete the product", 401);

  await Product.deleteOne({ _id: id });

  return res.json({
    success: true,
    message: `Product with id ${id} deleted successfully`,
  });
};

export const getShopInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("params from get shop info", req.params);
  if (!id) throw new AppError("Shop id is required", 400);

  const shop = await Shop.findById(id);
  return res.json({ success: true, shop });
};
