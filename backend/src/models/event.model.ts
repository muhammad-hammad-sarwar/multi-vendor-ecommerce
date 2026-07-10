import mongoose, { Schema, Types } from "mongoose";
import { Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  description: string;
  category: string;
  tags: string[];
  originalPrice: number;
  discountPrice?: number;
  stock: number;
  sold_out: number;
  shop: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>(
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
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
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

export const Event = mongoose.model<IEvent>("event", eventSchema);
