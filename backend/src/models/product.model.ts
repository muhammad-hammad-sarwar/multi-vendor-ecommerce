import mongoose, { Schema, Types } from "mongoose";
import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  tags: string[];
  originalPrice: number;
  discountPrice?: number;
  stock: number;
  ratings: number;
  reviews: {
    user: Types.ObjectId;
    createdAt?: Date;
    rating: number;
    comment: string;
  }[];
  sold_out: number;
  shop: Types.ObjectId;
  images: string[];
  createdAt: Date;
  updatedAt: Date;

  // For receiving cart from applying coupon
  // quantity?: number;
}

export interface CartProduct extends IProduct {
  quantity: number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },
    ratings: { type: Number },
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export const Product = mongoose.model<IProduct>("product", productSchema);
