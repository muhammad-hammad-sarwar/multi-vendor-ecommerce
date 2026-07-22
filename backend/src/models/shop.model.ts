import mongoose, { Schema, Document } from "mongoose";

export interface IShop extends Document {
  name: string;
  description: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phoneNumber: string;
  role: "seller";
  availableBalance: number;
  withdrawMethods: {
    _id?: string;
    bankName: string;
    bankCountry: string;
    swiftCode: string;
    accountNumber: string;
    accountHolderName: string;
    bankAddress: string;
  }[];
  zipCode: string;
  isVerified?: boolean;
  verifyTokenHash: string;
  verifyTokenExpiry: Date;
}

const shopSchema = new Schema<IShop>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
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
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    availableBalance: {
      type: Number,
      default: 0,
      min: 0,
    },
    zipCode: {
      type: String,
      required: true,
    },

    role: { type: String, enum: ["seller"] },

    withdrawMethods: [
      {
        bankName: {
          type: String,
          required: true,
        },
        bankCountry: {
          type: String,
          required: true,
        },
        swiftCode: {
          type: String,
          required: true,
        },
        accountNumber: {
          type: String,
          required: true,
        },
        accountHolderName: {
          type: String,
          required: true,
        },
        bankAddress: {
          type: String,
          required: true,
        },
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

export const Shop = mongoose.model<IShop>("shop", shopSchema);
