import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import shopReducer from "./slices/shop";
import productReducer from "./slices/product";
import cartReducer from "./slices/cart";
import wishlistReducer from "./slices/wishlist";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    products: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
