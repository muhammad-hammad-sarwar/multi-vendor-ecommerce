import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product";

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
  // logged-in
  shop: null | IShop;
  loading: boolean;
  error: null | string;
  isSeller: boolean;
  products: Product[] | null;

  // current shop is for get by id
  currentShop: null | IShop;
  infoLoading: boolean;
  currentShopProducts: Product[] | null;
}

const initialState: ShopState = {
  shop: null,
  loading: false,
  error: null,
  isSeller: false,
  products: null,

  currentShop: null,
  infoLoading: false,
  currentShopProducts: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShop(state, action) {
      state.shop = action.payload;
    },

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

    // For All shop sellers info
    loadShopInfoStart(state) {
      state.infoLoading = true;
    },

    loadShopInfoSuccess(state, action) {
      state.infoLoading = false;
      state.currentShop = action.payload;
    },

    loadShopInfoFailure(state, action) {
      state.infoLoading = false;
      state.error = action.payload;
    },

    // current shop info products
    loadShopProductstart(state) {
      state.infoLoading = true;
    },

    loadShopProductsSuccess(state, action) {
      state.infoLoading = false;
      state.currentShopProducts = action.payload;
    },

    loadShopProductsFailure(state, action) {
      state.infoLoading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.isSeller = false;
      state.shop = null;
    },
  },
});

export const {
  addShop,
  loadShopFailed,
  loadShopStart,
  loadShopSuccess,

  // current shop
  loadShopInfoStart,
  loadShopInfoSuccess,
  loadShopInfoFailure,
  loadShopProductstart,
  loadShopProductsSuccess,
  loadShopProductsFailure,
  logout,
} = shopSlice.actions;
export default shopSlice.reducer;
