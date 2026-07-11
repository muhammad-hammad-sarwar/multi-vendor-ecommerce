import api from "@/axios/api";
import {
  loadShopInfoFailure,
  loadShopInfoStart,
  loadShopInfoSuccess,
  loadShopProductsFailure,
  loadShopProductsSuccess,
  loadShopProductstart,
} from "../slices/shop";
import { AppDispatch } from "../store";

export const loadCurrentShopInfo = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadShopInfoStart());
    const res = await api.get(`/shop/info/${id}`);
    dispatch(loadShopInfoSuccess(res?.data?.shop));
  } catch (error) {
    dispatch(
      loadShopInfoFailure(
        error?.response?.data?.message || "Failed to fetch shop",
      ),
    );
  }
};

export const loadCurrentShopProducts =
  (id) => async (dispatch: AppDispatch) => {
    try {
      dispatch(loadShopProductstart());
      const res = await api.get(`/products/shop/${id}`);
      dispatch(loadShopProductsSuccess(res?.data?.products));
    } catch (error) {
      dispatch(
        loadShopProductsFailure(
          error?.response?.data?.message || "Failed to fetch shop",
        ),
      );
    }
  };
