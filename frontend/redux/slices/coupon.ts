import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface ICoupon {
  _id: string;
  name: string;
  discountPercentage: number;
  // productId: string;
  product: string;
}

interface CouponState {
  loading: boolean;
  totalDiscount: number | null;
  appliedCoupons: ICoupon[];
  error: string | null;

  coupons: ICoupon[] | null;
  deleteLoading: boolean;
}

const initialState: CouponState = {
  loading: false,
  totalDiscount: null,
  error: null,
  appliedCoupons: [],

  coupons: null,
  deleteLoading: false,
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
      const { product, discountPercentage, name, _id } = action.payload;

      const alreadyApplied = state.appliedCoupons.find(
        (c) => c.product == product,
      );

      if (alreadyApplied) {
        toast.error(`Coupon ${name} already applied`);
        return;
      }

      state.appliedCoupons.push({
        _id,
        discountPercentage,
        name,
        product,
      });

      state.totalDiscount = state.appliedCoupons.reduce(
        (acc, c) => acc + c?.discountPercentage,
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

    getCouponsStart(state) {
      state.loading = true;
    },
    getCouponsSuccess(state, action) {
      state.loading = false;
      state.coupons = action.payload;
    },
    getCouponsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCouponStart(state) {
      state.deleteLoading = true;
    },
    deleteCouponSuccess(state, action) {
      state.deleteLoading = false;
      state.coupons = action.payload;
      toast.success("Coupon Deleted Successfully");
    },
    deleteCouponFailure(state, action) {
      state.deleteLoading = false;
      state.error = action.payload;
      toast.error(state.error);
    },
  },
});

export const {
  applyCouponStart,
  applyCouponSuccess,
  applyCouponFailure,
  getCouponsStart,
  getCouponsSuccess,
  getCouponsFailure,
  deleteCouponStart,
  deleteCouponSuccess,
  deleteCouponFailure,
} = couponSlice.actions;
export default couponSlice.reducer;
