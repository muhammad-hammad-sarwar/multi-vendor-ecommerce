import { NextFunction, Request, Response } from "express";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { AppError } from "../utils/AppError.js";

const cloudinaryUpload =
  (folder: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Single upload
      if (req.file) {
        const uploaded = await uploadToCloudinary({
          folder,
          buffer: req.file.buffer,
        });

        req.uploadedFiles = [
          {
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
          },
        ];

        return next();
      }

      // Multiple uploads
      if (req.files && Array.isArray(req.files)) {
        const uploadedFiles = await Promise.all(
          req.files.map((file) =>
            uploadToCloudinary({
              folder,
              buffer: file.buffer,
            }),
          ),
        );

        req.uploadedFiles = uploadedFiles.map((file) => ({
          url: file.secure_url,
          publicId: file.public_id,
        }));

        return next();
      }

      throw new AppError("No files uploaded.", 400);
    } catch (error) {
      next(error);
    }
  };

export default cloudinaryUpload;
