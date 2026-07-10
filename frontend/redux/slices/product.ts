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
}

interface ProductState {
  allProducts: null | Product[];
  loading: boolean;
  error: null | string;
}

const initialState: ProductState = {
  allProducts: null,
  loading: false,
  error: null,
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
  },
});

export const {
  getAllProductsStart,
  getAllProductsSuccess,
  getAllProductsFailure,
} = productSlice.actions;
export default productSlice.reducer;
