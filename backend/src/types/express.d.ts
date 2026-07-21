import { IShop } from "../models/shop.model.ts";
import { IUser } from "../models/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | IShop;
    }
  }
}
