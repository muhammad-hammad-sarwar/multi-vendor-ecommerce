import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import shopReducer from "./slices/shop";
import productReducer from "./slices/product";
import eventReducer from "./slices/events";
import cartReducer from "./slices/cart";
import wishlistReducer from "./slices/wishlist";
import couponReducer from "./slices/coupon";
import orderReducer from "./slices/order";
import conversationReducer from "./slices/conversations";
import messageReducer from "./slices/message";
import adminReducer from "./slices/admin";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    products: productReducer,
    events: eventReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    coupon: couponReducer,
    order: orderReducer,
    conversation: conversationReducer,
    message: messageReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
