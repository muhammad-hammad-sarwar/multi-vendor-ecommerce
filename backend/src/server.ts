import dotenv from "dotenv";
dotenv.config();
import validateEnv from "./utils/validateEnv.js";
validateEnv();

import { connectDB } from "./db/database.js";
import app from "./app.js";

(async () => {
  await connectDB();

  app.listen(8000, () => {
    console.log("Server Running at 8000");
  });
})();
