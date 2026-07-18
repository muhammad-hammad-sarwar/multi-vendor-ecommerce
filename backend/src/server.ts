import dotenv from "dotenv";
dotenv.config();
import validateEnv from "./utils/validateEnv.js";
import stripe from "stripe";
import { connectDB } from "./db/database.js";
validateEnv();

import express from "express";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRouter from "./routes/shop.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import eventRouter from "./routes/event.route.js";
import profileRouter from "./routes/profile.route.js";
import couponRouter from "./routes/coupon.route.js";
import paymentRouter from "./routes/payment.route.js";
import orderRouter from "./routes/order.route.js";

if (!process.env?.STRIPE_SECRET_KEY)
  throw new Error("STRIPE_SECRET_KEY is missing");
export const Stripe = new stripe(process.env?.STRIPE_SECRET_KEY);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://multi-vendor-ecommerce-fe.vercel.app/",
    ],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: `${process.env?.DB_URL}` });
});

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/products", productRouter);
app.use("/events", eventRouter);
app.use("/profile", profileRouter);
app.use("/coupon", couponRouter);
app.use("/payment", paymentRouter);
app.use("/orders", orderRouter);

// Error Handling
app.use(errorMiddleware);

(async () => {
  await connectDB();

  app.listen(8000, () => {
    console.log("Server Running at 8000");
  });
})();
