import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  avatar: z.url("Avatar must be a valid URL"),
  // address: z.string().min(1, "Address is required"),
});

// export const verifyTokenSchema = z.object({
//   uid: ,
//   token: z.uuid()
// })

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z.string(),
});
