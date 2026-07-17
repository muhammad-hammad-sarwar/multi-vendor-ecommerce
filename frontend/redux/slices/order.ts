import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product";
import { IUser } from "./user";

interface CartItem extends Product {
  quantity: number;
  isReviewed?: boolean;
}

export interface Order {
  _id: string;
  status: string;
  totalPrice: string;
  cart: CartItem[];
  shop: string;
  user: IUser;
  shippingInfo: {
    address1: string;
    address2: string;
    city: string;
    country: string;
    zipCode: string;
  };
  paymentInfo: { status: string };
  createdAt: Date;
  updatedAt: Date;
}

interface ProductState {
  orders: null | Order[];
  loading: boolean;
  error: null | string;
}

const initialState: ProductState = {
  orders: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrdersStart(state) {
      state.loading = true;
    },
    // getOrdersSuccess(state, action: PayloadAction<Product[]>) {
    getOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    getOrdersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getOrdersStart, getOrdersSuccess, getOrdersFailure } =
  orderSlice.actions;
export default orderSlice.reducer;
