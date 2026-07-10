import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  address?: string;
  isVerified?: boolean;
  verifyTokenHash: string;
  verifyTokenExpiry: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },

    // Verify User after creation
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyTokenHash: {
      type: String,
      required: true,
    },
    verifyTokenExpiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("user", userSchema);
