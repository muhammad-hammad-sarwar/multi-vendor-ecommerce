import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICoupon extends Document {
  name: string;
  discountPercentage: number;
  minimumPurchaseAmount: number;
  maximumDiscountAmount?: number;
  product: Types.ObjectId;
  shop: Types.ObjectId;
  expiryDate: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    discountPercentage: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },

    minimumPurchaseAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    maximumDiscountAmount: {
      type: Number,
      min: 0,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "product",
      required: true,
      unique: true, // each product can have only one coupon
    },

    shop: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      required: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Coupon = mongoose.model<ICoupon>("coupon", couponSchema);
