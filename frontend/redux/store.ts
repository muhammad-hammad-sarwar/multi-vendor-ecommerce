import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import shopReducer from "./slices/shop";
import productReducer from "./slices/product";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
