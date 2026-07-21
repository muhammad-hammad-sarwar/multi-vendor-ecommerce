import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
  _id?: string;
  country: string;
  city: string;
  address1: string;
  address2: string;
  zipCode: string;
  addressType: "Home" | "Office" | "Default";
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  addresses?: IAddress[];
  phoneNumber: string;
  role: "user" | "admin";
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
    phoneNumber: {
      type: String,
      // minLength: [15, "Phone Number must be 11 digits"],
      // maxLength: [15, "Phone Number must be 11 digits"],
      default: "",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    addresses: [
      {
        type: {
          country: { type: String, required: true },
          city: { type: String, required: true },
          address1: { type: String, required: true },
          address2: { type: String, required: true },
          zipCode: { type: String, required: true },
          addressType: {
            type: String,
            default: "Default",
            enum: ["Home", "Office", "Default"],
          },
        },
        default: [],
      },
    ],

    // Verify User after creation
    isVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    verifyTokenHash: {
      type: String,
      required: true,
      select: false,
    },
    verifyTokenExpiry: {
      type: Date,
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>("user", userSchema);
