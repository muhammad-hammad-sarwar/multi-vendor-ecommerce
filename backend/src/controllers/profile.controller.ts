import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { deleteFile } from "../utils/deleteFile.js";

export const updateProfileAvatar = async (req: Request, res: Response) => {
  if (!req?.user) throw new AppError("Please login to continue", 401);
  if (!req.file?.filename) throw new AppError("Please Enter the file", 400);

  if (req?.user?.avatar) {
    deleteFile(req.user?.avatar);
  }

  req.user.avatar = req.file?.filename;
  await req.user?.save();

  return res.status(200).json({
    success: true,
    message: "Profile picture updated successfully.",
    user: req.user,
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  const { name, phoneNumber, password } = req.body;

  if (!req.user) {
    throw new AppError("Please login to continue", 401);
  }

  if (name === req.user.name && phoneNumber === req.user.phoneNumber) {
    throw new AppError("No changes were made to your profile.", 400);
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Current password is incorrect.", 401);
  }

  user.name = name;
  user.phoneNumber = phoneNumber;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    user,
  });
};

export const updateProfilePassword = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Please login to continue.", 401);
  }

  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new AppError("Please fill all fields.", 400);
  }

  if (newPassword !== confirmPassword) {
    throw new AppError("New password and confirm password do not match.", 400);
  }

  if (oldPassword === newPassword) {
    throw new AppError(
      "New password must be different from the current password.",
      400,
    );
  }

  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    throw new AppError("User not found.", 404);
  }

  const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Current password is incorrect.", 401);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully.",
    user: req.user,
  });
};

export const updateProfileAddresses = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Please login to continue.", 401);
  }

  const { country, city, address1, address2, zipCode, addressType } = req.body;

  if (!country || !city || !address1 || !address2 || !zipCode || !addressType) {
    throw new AppError("Please fill all required fields.", 400);
  }

  const doesExist = req.user.addresses?.find(
    (address) => address.addressType === addressType,
  );

  if (doesExist) {
    throw new AppError(
      `A ${addressType.toLowerCase()} address already exists.`,
      400,
    );
  }

  req.user.addresses?.push({
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
  });

  await req.user.save();

  return res.status(200).json({
    success: true,
    message: "Address added successfully.",
    user: req.user,
  });
};

export const deleteUserAddress = async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError("Please login to continue.", 401);
  }

  const { id } = req.params;

  if (!id) {
    throw new AppError("Address type is required.", 400);
  }

  const address = req.user?.addresses?.find((add) => add._id == id);

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  req.user.addresses = req.user?.addresses?.filter((add) => add._id != id);

  await req.user.save();

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully.",
    user: req.user,
  });
};
