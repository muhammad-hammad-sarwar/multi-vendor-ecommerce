import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import shopReducer from "./slices/shop";
import productReducer from "./slices/product";
import cartReducer from "./slices/cart";
import wishlistReducer from "./slices/wishlist";
import couponReducer from "./slices/coupon";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    coupon: couponReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
