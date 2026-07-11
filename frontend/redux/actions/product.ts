import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  deleteSellerProductFailure,
  deleteSellerProductStart,
  deleteSellerProductSuccess,
  getAllProductsFailure,
  getAllProductsStart,
  getAllProductsSuccess,
  getSellerProductFailure,
  getSellerProductStart,
  getSellerProductSuccess,
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

export const loadSellerProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getSellerProductStart());
    const res = await api.get("/shop/products");
    dispatch(getSellerProductSuccess(res.data.products as Product[]));
  } catch (error) {
    dispatch(getSellerProductFailure(error?.response?.data?.message));
  }
};

export const deleteSellerProduct = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(deleteSellerProductStart());
    const res = await api.get(`/shop/products/${id}`);
    dispatch(deleteSellerProductSuccess(res.data.products as Product[]));
  } catch (error) {
    dispatch(deleteSellerProductFailure(error?.response?.data?.message));
  }
};
