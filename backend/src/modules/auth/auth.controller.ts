import { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/AppError.js";
import { User } from "../user/user.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import { deleteFile } from "../../utils/deleteFile.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(process.env?.DB_URL);
  const { name, email, password, address } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    // Delete the user avatar
    req.file?.filename && deleteFile(req.file?.filename);
    throw new AppError("user with this email already exists", 409);
  }

  // hash password using 10 Salt Round
  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyTokenHashUUID = crypto.randomUUID();
  const verifyTokenHash = await bcrypt.hash(verifyTokenHashUUID, 10);
  const verifyTokenExpiry = new Date(Date.now() + 10 * 60 * 1000);
  const avatar = req.file?.filename;
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar,
    address,
    verifyTokenHash,
    verifyTokenExpiry,
  });

  // Add to queue(background)

  try {
    await sendEmail(
      email,
      `http://localhost:3000/verify?uid=${newUser._id}&token=${verifyTokenHashUUID}`,
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
  const user = await User.findOne({ _id: uid });
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

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  if (user.isVerified) {
    throw new AppError("User already verified", 400);
  }

  const verifyTokenHash = crypto.randomUUID();
  const hashedToken = await bcrypt.hash(verifyTokenHash, 10);
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  user.verifyTokenHash = hashedToken;
  user.verifyTokenExpiry = expiry;

  await user.save();

  try {
    await sendEmail(
      user.email,
      `http://localhost:3000/verify?uid=${user._id}&token=${verifyTokenHash}`,
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
  console.log(process.env?.DB_URL);
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("User not found", 404);

  const isSame = await bcrypt.compare(password, user.password);
  if (!isSame) throw new AppError("Password is incorrect", 401);

  const token = jwt.sign({ userId: user._id }, `${process.env.JWT_SECRET}`, {
    expiresIn: "7d",
  });

  // lax means different domains for frontend and backend
  res
    .cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" })
    .json({ success: true, message: "Welcome back" });
};

export const loadUser = async (req: Request, res: Response) => {
  const token = req.cookies?.token;
  console.log("token", token);
  if (!token) throw new AppError("Not authenticated", 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
    userId: string;
  };

  console.log("Decoded ", decoded);

  const user = await User.findById(decoded.userId);
  if (!user) throw new AppError("User not found", 404);

  res.status(200).json({
    success: true,
    user,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  res.json({ success: true, message: "Logged out successfully" });
};
