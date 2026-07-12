import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  applyCouponFailure,
  applyCouponStart,
  applyCouponSuccess,
} from "../slices/coupon";

export const checkCouponCodeValidity =
  ({ couponCode, cart }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(applyCouponStart());
      const res = await api.post("/coupon/apply", { cart, couponCode });
      dispatch(
        applyCouponSuccess({
          discount: res.data?.discount,
          couponCode,
          productId: res.data?.appliedProduct,
        }),
      );
    } catch (error) {
      // console.dir("error from check coupon validitiy", error);
      dispatch(applyCouponFailure(error?.response?.data?.message));
    }
  };
