import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  applyCouponFailure,
  applyCouponStart,
  applyCouponSuccess,
  deleteCouponFailure,
  deleteCouponStart,
  deleteCouponSuccess,
  getCouponsFailure,
  getCouponsStart,
  getCouponsSuccess,
} from "../slices/coupon";

export const checkCouponCodeValidity =
  ({ couponCode, cart }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(applyCouponStart());
      const res = await api.post("/coupon/apply", { cart, couponCode });
      dispatch(applyCouponSuccess(res.data?.coupon));
    } catch (error) {
      dispatch(applyCouponFailure(error?.response?.data?.message));
    }
  };

export const getCoupons = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getCouponsStart());
    const res = await api.get("/coupon");
    dispatch(getCouponsSuccess(res.data?.coupons));
  } catch (error) {
    dispatch(getCouponsFailure(error?.response?.data?.message));
  }
};

export const deleteCoupon = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deleteCouponStart());
    const res = await api.delete(`/coupon/${id}`);
    dispatch(deleteCouponSuccess(res.data.coupons));
  } catch (error) {
    dispatch(deleteCouponFailure(error?.response?.data?.message));
  }
};
