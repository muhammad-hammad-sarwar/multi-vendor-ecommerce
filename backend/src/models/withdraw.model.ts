import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWithdraw extends Document {
  seller: Types.ObjectId;
  amount: number;
  status: "Processing" | "Success";
  paymentMethodId: Types.ObjectId;
}

const withdrawSchema = new Schema<IWithdraw>(
  {
    seller: { type: Types.ObjectId, ref: "shop", required: true, min: 1 },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Success"],
      default: "Processing",
    },
    paymentMethodId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true },
);

export const Withdraw = mongoose.model<IWithdraw>("withdraw", withdrawSchema);
