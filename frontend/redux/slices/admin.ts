import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./product";
import { IEvent } from "./events";
import { IUser } from "./user";
import { IShop } from "./shop";
import { Order } from "./order";

interface AdminState {
  products: Product[];
  events: IEvent[];
  users: IUser[];
  sellers: IShop[];
  orders: Order[];

  loading: {
    // Fetching
    products: boolean;
    events: boolean;
    users: boolean;
    sellers: boolean;
    orders: boolean;

    // Products
    deleteProduct: boolean;
    updateProduct: boolean;

    // Events
    deleteEvent: boolean;
    updateEvent: boolean;

    // Users
    blockUser: boolean;
    unblockUser: boolean;

    // Sellers
    blockSeller: boolean;
    unblockSeller: boolean;

    // Orders
    updateOrder: boolean;
  };
  error: string | null;
}

const initialState: AdminState = {
  products: null,
  events: null,
  users: null,
  sellers: null,
  orders: null,
  loading: {
    products: false,
    events: false,
    users: false,
    sellers: false,
    orders: false,

    deleteProduct: false,
    updateProduct: false,

    deleteEvent: false,
    updateEvent: false,

    blockUser: false,
    unblockUser: false,

    blockSeller: false,
    unblockSeller: false,

    updateOrder: false,
  },

  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // Products
    getProductsStart(state) {
      state.loading.products = true;
      state.error = null;
    },

    getProductsSuccess(state, action: PayloadAction<any[]>) {
      state.loading.products = false;
      state.products = action.payload;
    },

    getProductsFailure(state, action: PayloadAction<string>) {
      state.loading.products = false;
      state.error = action.payload;
    },

    // Events
    getEventsStart(state) {
      state.loading.events = true;
      state.error = null;
    },

    getEventsSuccess(state, action: PayloadAction<any[]>) {
      state.loading.events = false;
      state.events = action.payload;
    },

    getEventsFailure(state, action: PayloadAction<string>) {
      state.loading.events = false;
      state.error = action.payload;
    },

    // Users
    getUsersStart(state) {
      state.loading.users = true;
      state.error = null;
    },

    getUsersSuccess(state, action: PayloadAction<any[]>) {
      state.loading.users = false;
      state.users = action.payload;
    },

    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading.users = false;
      state.error = action.payload;
    },

    // Sellers
    getSellersStart(state) {
      state.loading.sellers = true;
      state.error = null;
    },

    getSellersSuccess(state, action: PayloadAction<any[]>) {
      state.loading.sellers = false;
      state.sellers = action.payload;
    },

    getSellersFailure(state, action: PayloadAction<string>) {
      state.loading.sellers = false;
      state.error = action.payload;
    },

    // Orders
    getOrdersStart(state) {
      state.loading.orders = true;
      state.error = null;
    },

    getOrdersSuccess(state, action: PayloadAction<any[]>) {
      state.loading.orders = false;
      state.orders = action.payload;
    },

    getOrdersFailure(state, action: PayloadAction<string>) {
      state.loading.orders = false;
      state.error = action.payload;
    },

    // Delete Product
    deleteProductStart(state) {
      state.loading.deleteProduct = true;
      state.error = null;
    },

    deleteProductSuccess(state, action) {
      // payload.action will contain deleted product id
      state.loading.deleteProduct = false;

      state.products = state.products?.filter(
        (product) => product._id !== action.payload,
      );
    },

    deleteProductFailure(state, action: PayloadAction<string>) {
      state.loading.deleteProduct = false;
      state.error = action.payload;
    },

    // Delete Event
    deleteEventStart(state) {
      state.loading.deleteEvent = true;
      state.error = null;
    },

    deleteEventSuccess(state, action: PayloadAction<string>) {
      state.loading.deleteEvent = false;

      state.events = state.events?.filter(
        (event) => event._id !== action.payload,
      );
    },

    deleteEventFailure(state, action: PayloadAction<string>) {
      state.loading.deleteEvent = false;
      state.error = action.payload;
    },
  },
});

export const {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,

  getEventsStart,
  getEventsSuccess,
  getEventsFailure,

  getUsersStart,
  getUsersSuccess,
  getUsersFailure,

  getSellersStart,
  getSellersSuccess,
  getSellersFailure,

  getOrdersStart,
  getOrdersSuccess,
  getOrdersFailure,

  // Delete Product
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,

  // Delete Event
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
} = adminSlice.actions;

export default adminSlice.reducer;
