import api from "@/axios/api";
import {
  getOrdersFailure,
  getOrdersStart,
  getOrdersSuccess,
  Order,
} from "../slices/order";
import { AppDispatch } from "../store";

export const getAllOrders =
  (isSeller?: boolean) => async (dispatch: AppDispatch) => {
    try {
      const url = isSeller ? "/orders/seller" : "/orders/user";
      dispatch(getOrdersStart());
      const res = await api.get(url);
      dispatch(getOrdersSuccess(res.data.orders as Order[]));
    } catch (error) {
      dispatch(getOrdersFailure(error?.response?.data?.message));
    }
  };
