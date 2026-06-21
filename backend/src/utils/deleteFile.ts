import fs from "fs";
import path from "path";

export const deleteFile = (filename: string) => {
  const filePath = path.join(process.cwd(), "uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("File delete failed:", err.message);
    }
  });
};
