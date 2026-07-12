import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ICoupon {
  name: string;
  discount: number;
  productId: string;
}

interface CouponState {
  loading: boolean;
  totalDiscount: number | null;
  appliedCoupons: ICoupon[];
  error: string | null;
}

const initialState = {
  loading: false,
  totalDiscount: null,
  error: null,
  appliedCoupons: [],
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    applyCouponStart(state) {
      state.loading = true;
    },

    applyCouponSuccess(state, action) {
      state.loading = false;
      const { productId, discount, couponCode } = action.payload;

      const alreadyApplied = state.appliedCoupons.find(
        (c) => c?.productId == productId,
      );

      if (alreadyApplied) {
        toast.error(`Coupon ${couponCode} already applied`);
        return;
      }

      state.appliedCoupons.push({
        discount: discount,
        name: couponCode,
        productId: productId,
      });

      state.totalDiscount = state.appliedCoupons.reduce(
        (acc, c) => acc + c?.discount,
        0,
      );

      toast.success(
        `Coupon Code applied with discount of USD$ ${action.payload?.discount}`,
      );
    },

    applyCouponFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      toast.error(state.error);
    },
  },
});

export const { applyCouponStart, applyCouponSuccess, applyCouponFailure } =
  couponSlice.actions;
export default couponSlice.reducer;
