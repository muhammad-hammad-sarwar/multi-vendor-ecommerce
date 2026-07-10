import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IShop {
  _id: string;
  name: string;
  description: string;
  email: string;
  password: string;
  avatar: string;
  address: string;
  phoneNumber: string;
  zipCode: string;
  createdAt: string;
}

interface ShopState {
  shop: null | IShop;
  loading: boolean;
  error: null | string;
  isSeller: boolean;
}

const initialState: ShopState = {
  shop: null,
  loading: false,
  error: null,
  isSeller: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    loadShopStart(state) {
      state.loading = true;
      state.error = null;
    },

    loadShopSuccess(state, action: PayloadAction<IShop>) {
      state.loading = false;
      state.shop = action.payload;
      state.isSeller = true;
    },

    loadShopFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.shop = null;
    },

    logout(state) {
      state.isSeller = false;
      state.shop = null;
    },
  },
});

export const { loadShopFailed, loadShopStart, loadShopSuccess, logout } =
  shopSlice.actions;
export default shopSlice.reducer;
