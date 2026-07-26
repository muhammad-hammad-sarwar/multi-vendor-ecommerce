import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { deleteFromCloudinary } from "../utils/deleteFile.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  const file = req.uploadedFiles?.[0];
  if (user) {
    // Delete the user avatar
    file?.publicId && deleteFromCloudinary(file?.publicId);
    throw new AppError("user with this email already exists", 409);
  }

  // hash password using 10 Salt Round
  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyTokenHashUUID = crypto.randomUUID();
  const verifyTokenHash = await bcrypt.hash(verifyTokenHashUUID, 10);
  const verifyTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: file,
    verifyTokenHash,
    verifyTokenExpiry,
  });

  // Add to queue(background)

  try {
    await sendEmail(
      email,
      `${process.env?.NODE_ENV === "development" ? "http://localhost:3000" : "https://multi-vendor-ecommerce-fe.vercel.app"}/verify?uid=${newUser._id}&token=${verifyTokenHashUUID}`,
    );
  } catch (error) {
    throw new AppError("Error sending email: Please retry Verification", 500);
  }

  res
    .status(201)
    .json({ success: true, message: `Email verification sent to ${email}` });
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { uid, token } = req.body;
  const user = await User.findOne({ _id: uid }).select(
    "+verifyTokenHash +verifyTokenExpiry +isVerified",
  );
  if (!user) throw new AppError("User not found", 404);

  const verifyTokenExpiry = user.verifyTokenExpiry;
  if (verifyTokenExpiry <= new Date())
    throw new AppError("Verification token expired", 400);
  const isSame = await bcrypt.compare(token, user.verifyTokenHash);
  if (!isSame) throw new AppError("Token is not valid", 401);

  if (user.isVerified)
    throw new AppError(
      "You are already verified. Please login to continue",
      400,
    );

  user.isVerified = true;
  await user.save();

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

  const user = await User.findOne({ email }).select(
    "+verifyTokenHash +verifyTokenExpiry +isVerified",
  );
  if (!user) throw new AppError("User not found", 404);

  if (user.isVerified)
    return res.json({ success: true, message: "You are Verified" });

  if (user.verifyTokenExpiry > new Date())
    throw new AppError("Email has already been sent. Please wait!", 400);

  const verifyTokenHash = crypto.randomUUID();
  const hashedToken = await bcrypt.hash(verifyTokenHash, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.verifyTokenHash = hashedToken;
  user.verifyTokenExpiry = expiry;

  await user.save();

  try {
    await sendEmail(
      user.email,
      `${process.env?.NODE_ENV === "development" ? "http://localhost:3000" : "https://multi-vendor-ecommerce-fe.vercel.app"}/verify?uid=${user._id}&token=${verifyTokenHash}`,
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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!process.env?.DB_URL) throw new AppError("Please Add DB URL", 400);
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isSame = await bcrypt.compare(password, user.password);
  if (!isSame) throw new AppError("Password is incorrect", 401);

  const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });

  const { password: pswd, ...safeUser } = user.toObject();

  // lax means different domains for frontend and backend
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .json({ success: true, message: "Welcome back", user: safeUser });
};

export const loadUser = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) throw new AppError("Not authenticated", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };

  const user = await User.findById(decoded.userId);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
  });

  res.json({ success: true, message: "Logged out successfully" });
};
