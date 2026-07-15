import { Request, Response } from "express";
import { Stripe } from "../server.js";

export const createPaymentIntent = async (req: Request, res: Response) => {
  const paymentintent = await Stripe.paymentIntents.create({
    currency: "usd",
    amount: req.body?.amount,
    metadata: { company: "SOLO" },
  });

  res.json({ success: true, client_secret: paymentintent.client_secret });
};

export const getApiKey = (req: Request, res: Response) => {
  res.json({ success: true, stripeApiKey: process.env?.STRIPE_API_KEY });
};
