import { UploadApiResponse, UploadApiErrorResponse } from "cloudinary";
import crypto from "crypto";
import { cloudinary } from "../server.js";

interface UploadOptions {
  folder: string;
  buffer: Buffer;
  filename?: string;
}

export const uploadToCloudinary = ({
  folder,
  buffer,
}: UploadOptions): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const publicId = crypto.randomUUID();

    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "auto",
      },
      (
        error: UploadApiErrorResponse | undefined,
        result: UploadApiResponse | undefined,
      ) => {
        if (error) return reject(error);

        if (!result) {
          return reject(new Error("Cloudinary upload failed."));
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
};
