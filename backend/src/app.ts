import express from "express";
import { Request, Response } from "express";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import shopRouter from "./routes/shop.route.js";
import authRouter from "./routes/auth.route.js";
import productRouter from "./routes/product.route.js";
import eventRouter from "./routes/event.route.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Hello from backend" });
});

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use("/shop", shopRouter);
app.use("/products", productRouter);
app.use("/events", eventRouter);

// Error Handling
app.use(errorMiddleware);

export default app;
