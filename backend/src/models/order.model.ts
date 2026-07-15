import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    cart: { type: Array, required: true },
    shippingInfo: { type: Object, required: true },
    user: { type: Object, required: true },
    totalPrice: { type: Number, requred: true },
    status: {
      // Status of order itself
      type: String,
      default: "Processing",
      enum: ["Processing", "Delivered", "Shipped"], // Also add requried fields
    },
    paymentInfo: {
      id: { type: String },
      status: { type: String }, // Status of payment
      type: { type: String, enum: ["PayPal", "Credit Card", "CashOnDelivery"] }, // Either PayPal, Stripe or CashOnDelivery
    },
    paidAt: { type: Date, default: Date.now() },
    deliveredAt: { type: Date },
  },
  { timestamps: true },
);

export const Order = mongoose.model("order", orderSchema);
