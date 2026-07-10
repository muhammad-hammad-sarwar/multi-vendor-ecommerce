import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters")
    .max(100),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  category: z.string().trim().min(1, "Category is required"),

  tags: z.preprocess((value) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  }, z.array(z.string().trim()).default([])),

  originalPrice: z.coerce
    .number()
    .positive("Original price must be greater than 0"),

  discountPrice: z.coerce.number().positive().optional(),

  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});
