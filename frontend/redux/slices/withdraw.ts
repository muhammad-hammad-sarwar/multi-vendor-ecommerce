import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IShop } from "./shop";

interface IWithdraw {
  _id: string;
  seller: IShop;
  amount: number;
  status: "Processing" | "Success";
  paymentMethodId: string;
}

interface WithdrawState {
  withdrawRequests: IWithdraw[] | null;

  loading: {
    get: boolean;
    approve: boolean;
  };

  error: string | null;
}

const initialState: WithdrawState = {
  withdrawRequests: null,

  loading: {
    get: false,
    approve: false,
  },

  error: null,
};

const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {
    getWithdrawRequestsStart(state) {
      state.loading.get = true;
      state.error = null;
    },

    getWithdrawRequestsSuccess(state, action: PayloadAction<IWithdraw[]>) {
      state.loading.get = false;
      state.withdrawRequests = action.payload;
    },

    getWithdrawRequestsFailure(state, action: PayloadAction<string>) {
      state.loading.get = false;
      state.error = action.payload;
    },

    approveWithdrawRequestStart(state) {
      state.loading.approve = true;
      state.error = null;
    },

    approveWithdrawRequestSuccess(state, action: PayloadAction<IWithdraw>) {
      state.loading.approve = false;

      state.withdrawRequests =
        state.withdrawRequests?.map((withdraw) =>
          withdraw._id === action.payload._id ? action.payload : withdraw,
        ) ?? null;
    },

    approveWithdrawRequestFailure(state, action: PayloadAction<string>) {
      state.loading.approve = false;
      state.error = action.payload;
    },

    clearWithdrawError(state) {
      state.error = null;
    },
  },
});

export const {
  getWithdrawRequestsStart,
  getWithdrawRequestsSuccess,
  getWithdrawRequestsFailure,

  approveWithdrawRequestStart,
  approveWithdrawRequestSuccess,
  approveWithdrawRequestFailure,

  clearWithdrawError,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
