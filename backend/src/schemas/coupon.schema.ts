import { z } from "zod";

export const createCouponSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Coupon name is required")
    .max(50, "Coupon name cannot exceed 50 characters"),

  discountPercentage: z
    .number("Discount percentage is required")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%"),

  maximumDiscountAmount: z
    .number()
    .min(0, "Maximum discount cannot be negative")
    .optional(),

  product: z.string("Product is required").min(1, "Product is required"),

  shop: z.string("Shop is required").min(1, "Shop is required"),

  expiryDate: z.coerce.date("Expiry date is required"),
});
