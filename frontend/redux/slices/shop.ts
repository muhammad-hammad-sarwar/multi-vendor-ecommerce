import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product";
import { toast } from "react-toastify";
import { IEvent } from "./events";
import { Img } from "./user";

export interface WithdrawMethod {
  _id: string;
  bankName: string;
  bankCountry: string;
  swiftCode: string;
  accountNumber: string;
  accountHolderName: string;
  bankAddress: string;
}

export interface IShop {
  _id: string;
  name: string;
  description: string;
  email: string;
  password: string;
  avatar: Img;
  address: string;
  availableBalance: number;
  phoneNumber: string;
  withdrawMethods: WithdrawMethod[];
  zipCode: string;
  createdAt: string;
  isVerified: boolean;
  role: "seller";
}

interface ShopState {
  // logged-in
  initialized: boolean;
  shop: null | IShop;
  loading: boolean;
  error: null | string;
  isSeller: boolean;
  products: Product[] | null;
  events: null;

  profileUpdateLoading: boolean;

  // current shop is for get by id
  currentShop: null | IShop;
  infoLoading: boolean;
  currentShopProducts: Product[] | null;
  currentShopEvents: IEvent[] | null;
}

const initialState: ShopState = {
  initialized: false,
  shop: null,
  loading: false,
  error: null,
  isSeller: false,
  products: null,
  events: null,

  profileUpdateLoading: false,

  currentShop: null,
  infoLoading: false,
  currentShopProducts: null,
  currentShopEvents: null,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    addShop(state, action) {
      state.shop = action.payload;
      state.initialized = true;
      state.isSeller = true;
    },

    loadShopStart(state) {
      state.loading = true;
      state.error = null;
      state.initialized = false;
    },

    loadShopSuccess(state, action: PayloadAction<IShop>) {
      state.loading = false;
      state.shop = action.payload;
      state.isSeller = true;
      state.initialized = true;
    },

    loadShopFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.shop = null;
      state.initialized = true;
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

    // current shop info events
    loadShopEventStart(state) {
      state.infoLoading = true;
    },

    loadShopEventSuccess(state, action) {
      state.infoLoading = false;
      state.currentShopEvents = action.payload;
    },

    loadShopEventFailure(state, action) {
      state.infoLoading = false;
      state.error = action.payload;
    },

    // For Avatar update
    updateShopAvatarStart(state) {
      state.loading = true;
    },
    updateShopAvatarSuccess(state, action) {
      state.loading = false;
      state.shop = action.payload;
    },
    updateShopAvatarFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // For Name and PhoneNumber
    updateShopProfileStart(state) {
      state.profileUpdateLoading = true;
    },
    updateShopProfileSuccess(state, action) {
      state.profileUpdateLoading = false;
      state.shop = action.payload;
      toast.success("Profile Updated successfully");
    },
    updateShopProfileFailure(state, action) {
      state.profileUpdateLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },

    logout(state) {
      state.isSeller = false;
      state.shop = null;
    },

    clearError(state) {
      state.error = null;
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

  // current shop - preview events

  loadShopEventStart,
  loadShopEventSuccess,
  loadShopEventFailure,

  loadShopProductstart,
  loadShopProductsSuccess,
  loadShopProductsFailure,

  updateShopAvatarStart,
  updateShopAvatarSuccess,
  updateShopAvatarFailure,

  updateShopProfileStart,
  updateShopProfileSuccess,
  updateShopProfileFailure,

  logout,
  clearError,
} = shopSlice.actions;
export default shopSlice.reducer;
