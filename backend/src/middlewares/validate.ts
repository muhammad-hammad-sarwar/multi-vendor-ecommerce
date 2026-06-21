import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import z from "zod";

export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      //   const errors = result.error.errors.map((err) => err.message);
      console.log(result.error.message);
      const error = "Error";
      return next(new AppError(error, 400));
    }

    req.body = result.data; // sanitized + typed
    next();
  };
