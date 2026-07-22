import { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { Shop } from "../models/shop.model.js";
import { withdrawMethodSchema } from "../schemas/shop.schema.js";
import { Withdraw } from "../models/withdraw.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const createWithdrawRequest = async (req: Request, res: Response) => {
  if (!req.user || req.user.role != "seller")
    throw new AppError("Please Login to continue", 400);

  const seller = req.user;

  const { amount, paymentMethodId } = req.body;

  if (amount > seller.availableBalance)
    throw new AppError("Insufficient Balance", 400);

  const exist = seller.withdrawMethods.find(
    (m) => m._id?.toString() === paymentMethodId?.toString(),
  );

  if (!exist) throw new AppError("Withdraw Method does not exist", 400);

  const pending = await Withdraw.exists({
    seller: seller._id,
    status: "Processing",
  });

  if (pending)
    throw new AppError("You already have a pending withdrawal request.", 400);

  const withdrawRequest = await Withdraw.create({
    amount,
    paymentMethodId,
    seller: seller._id,
  });

  try {
    await sendEmail(
      seller.email,
      `Hello ${seller.name}. Your Withdraw request of USD$${amount} is processing. It will take 3-7 days for processing`,
    );
  } catch (error) {
    throw new AppError("Error sending email", 500);
  }

  res.json({
    success: true,
    message: "Withdraw request created successfully",
    withdraw: withdrawRequest,
    seller,
  });
};

export const getWithdrawRequests = async (req: Request, res: Response) => {
  if (!req.user || req.user.role !== "admin") {
    throw new AppError("Unauthorized", 403);
  }

  const withdrawRequests = await Withdraw.find({})
    .sort({
      status: 1,
      createdAt: -1,
    })
    .populate({
      path: "seller",
      select: "name email availableBalance",
    });

  res.status(200).json({
    success: true,
    withdrawRequests,
  });
};

export const approveWithdrawRequest = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("Unauthorized", 403);

  const { id } = req.params;
  if (!id) throw new AppError("Withdraw Request id required", 400);
  const withdrawRequest = await Withdraw.findOne({
    _id: id,
    status: "Processing",
  });

  if (!withdrawRequest)
    throw new AppError("Withdraw Request does not exists", 400);
  const seller = await Shop.findById(withdrawRequest.seller);
  if (!seller) throw new AppError("Seller does not exists", 404);

  const paymentMethod = seller.withdrawMethods.find(
    (m) => m._id?.toString() === withdrawRequest.paymentMethodId?.toString(),
  );

  if (!paymentMethod)
    throw new AppError(
      "The withdrawal method used for this request no longer exists. Please contact the seller.",
      400,
    );

  if (seller?.availableBalance < withdrawRequest.amount)
    throw new AppError("Seller does not have sufficient wallet balance.", 400);

  seller.availableBalance -= withdrawRequest.amount;
  withdrawRequest.status = "Success";

  try {
    await sendEmail(
      seller.email,
      `Hello ${seller.name}. Your Withdraw request of ${withdrawRequest.amount} is Succeeded`,
    );
  } catch (error) {
    throw new AppError("Error sending email", 500);
  }

  await Promise.all([seller.save(), withdrawRequest.save()]);
  res.json({ success: true, message: "Withdraw Request Approved" });
};

export const getSellerWithdrawRequests = async (
  req: Request,
  res: Response,
) => {
  if (!req.user || req.user.role !== "seller")
    throw new AppError("Please login to continue", 401);

  const withdrawRequests = await Withdraw.find({
    seller: req.user._id,
  }).sort({
    status: 1,
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    withdrawRequests,
  });
};
