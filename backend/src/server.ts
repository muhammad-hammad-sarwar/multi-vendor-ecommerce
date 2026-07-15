import dotenv from "dotenv";
dotenv.config();
import validateEnv from "./utils/validateEnv.js";
import stripe from "stripe";

validateEnv();

import { connectDB } from "./db/database.js";
import app from "./app.js";
if (!process.env?.STRIPE_SECRET_KEY)
  throw new Error("STRIPE_SECRET_KEY is missing");

export const Stripe = new stripe(process.env?.STRIPE_SECRET_KEY);

(async () => {
  await connectDB();

  app.listen(8000, () => {
    console.log("Server Running at 8000");
  });
})();
