import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "./shop";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  originalPrice: number;
  discountPrice?: number;
  stock: number;
  sold_out: number;
  shop: IShop;
  images: string[];
  createdAt: Date;
  updatedAt: Date;

  // For Event adjusting in product and event by id
  endDate?: string;
}

interface ProductState {
  allProducts: null | Product[];
  loading: boolean;
  shopLoading: boolean;
  deleteLoading: boolean;
  error: null | string;
  products: null | Product[];
}

const initialState: ProductState = {
  allProducts: null,
  loading: false,
  shopLoading: false,
  deleteLoading: false,
  error: null,
  products: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProductsStart(state) {
      state.loading = true;
    },
    getAllProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.loading = false;
      state.allProducts = action.payload;
    },
    getAllProductsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getSellerProductStart(state) {
      state.shopLoading = true;
    },
    getSellerProductSuccess(state, action) {
      state.shopLoading = false;
      state.products = action.payload;
    },
    getSellerProductFailure(state, action) {
      state.shopLoading = false;
      state.error = action.payload;
    },

    deleteSellerProductStart(state) {
      state.deleteLoading = true;
    },
    deleteSellerProductSuccess(state, action) {
      state.deleteLoading = false;
      state.products = action.payload;
    },
    deleteSellerProductFailure(state, action) {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getSellerProductStart,
  getSellerProductSuccess,
  getSellerProductFailure,
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailure,
  deleteSellerProductStart,
  deleteSellerProductSuccess,
  deleteSellerProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
