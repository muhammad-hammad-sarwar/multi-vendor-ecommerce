import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.DB_URL) {
    throw new Error("DB_URL is missing!");
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL);
    console.log("DB connected:", db.connection.host);
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};
