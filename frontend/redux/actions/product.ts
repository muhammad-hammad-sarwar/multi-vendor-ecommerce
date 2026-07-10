import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  getAllProductsFailure,
  getAllProductsStart,
  getAllProductsSuccess,
  Product,
} from "../slices/product";

export const loadAllProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getAllProductsStart());
    const res = await api.get("/products");
    dispatch(getAllProductsSuccess(res.data.products as Product[]));
  } catch (error) {
    dispatch(getAllProductsFailure(error?.response?.data?.message));
  }
};
