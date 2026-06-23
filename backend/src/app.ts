import express from "express";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import authRouter from "./modules/auth/auth.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Hello from backend" });
});

app.use("/auth", authRouter);
app.use("/uploads", express.static("uploads"));

// Error Handling
app.use(errorMiddleware);

export default app;
