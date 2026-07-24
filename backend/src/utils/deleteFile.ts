import { cloudinary } from "../server.js";

export const deleteFromCloudinary = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};

export interface UploadedFile {
  publicId: string;
  url: string;
}

export const deleteMultipleFromCloudinary = async (files: UploadedFile[]) => {
  await Promise.all(files.map((file) => deleteFromCloudinary(file.publicId)));
};
