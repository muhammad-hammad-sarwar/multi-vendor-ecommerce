import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "./shop";

export interface IEvent {
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
  startDate: Date;
  endDate: Date;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface EventState {
  allEvents: null | IEvent[];
  loading: boolean;
  error: null | string;
  // For logged in shop
  shopLoading: boolean;
  events: null | IEvent[];
  deleteLoading: boolean;
}

const initialState: EventState = {
  allEvents: null,
  loading: false,
  shopLoading: false,
  deleteLoading: false,
  error: null,
  events: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    getAllEventsStart(state) {
      state.loading = true;
    },
    getAllEventsSuccess(state, action: PayloadAction<IEvent[]>) {
      state.loading = false;
      state.allEvents = action.payload;
      console.log("All Events", state.allEvents);
    },
    getAllEventsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getSellerEventsStart(state) {
      state.shopLoading = true;
    },
    getSellerEventsSuccess(state, action) {
      state.shopLoading = false;
      state.events = action.payload;
    },
    getSellerEventsFailure(state, action) {
      state.shopLoading = false;
      state.error = action.payload;
    },

    deleteSellerEventStart(state) {
      state.deleteLoading = true;
    },
    deleteSellerEventSuccess(state, action) {
      state.deleteLoading = false;
      state.events = action.payload;
    },
    deleteSellerEventFailure(state, action) {
      state.deleteLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllEventsStart,
  getAllEventsSuccess,
  getAllEventsFailure,
  deleteSellerEventStart,
  deleteSellerEventSuccess,
  deleteSellerEventFailure,
  getSellerEventsStart,
  getSellerEventsSuccess,
  getSellerEventsFailure,
} = eventSlice.actions;
export default eventSlice.reducer;
