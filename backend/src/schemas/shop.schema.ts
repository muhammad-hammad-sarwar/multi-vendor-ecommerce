import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const singleFileSchema = z
  .instanceof(File, { message: "Please select a valid file." })
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    ".jpg, .jpeg, .png and .webp files are accepted.",
  );

export const shopSchema = z.object({
  name: z.string("Shop name is required").trim().min(2).max(100),
  description: z.string("Description is required").max(500).optional(),
  email: z.email("Email is required").trim().toLowerCase(),
  password: z.string("Password is required").min(6).max(100),
  //   avatar: singleFileSchema,
  address: z.string("Address is required").min(5),
  phoneNumber: z.string("Phone Number is required"),
  //   .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  zipCode: z.string("Zip code is required"),
  //   .regex(/^\d{4,10}$/, "Invalid zip code"),
});
