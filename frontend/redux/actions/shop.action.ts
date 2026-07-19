import api from "@/axios/api";
import {
  loadShopEventFailure,
  loadShopEventStart,
  loadShopEventSuccess,
  loadShopInfoFailure,
  loadShopInfoStart,
  loadShopInfoSuccess,
  loadShopProductsFailure,
  loadShopProductsSuccess,
  loadShopProductstart,
  updateShopAvatarFailure,
  updateShopAvatarStart,
  updateShopAvatarSuccess,
  updateShopProfileFailure,
  updateShopProfileStart,
  updateShopProfileSuccess,
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

export const loadCurrentShopEvents = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadShopEventStart());
    const res = await api.get(`/events/shop/${id}`);
    dispatch(loadShopEventSuccess(res?.data?.products));
  } catch (error) {
    dispatch(
      loadShopEventFailure(
        error?.response?.data?.message || "Failed to fetch shop",
      ),
    );
  }
};

export const updateShopAvatar =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateShopAvatarStart());
      const res = await api.put("/shop/avatar", formData, {
        withCredentials: true,
      });

      dispatch(updateShopAvatarSuccess(res.data?.user));
    } catch (err) {
      dispatch(
        updateShopAvatarFailure(err?.response?.data?.message || "Failed"),
      );
    }
  };

export const updateShopProfile = (payload) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateShopProfileStart());
    const res = await api.put("/shop/profile", payload, {
      withCredentials: true,
    });

    dispatch(updateShopProfileSuccess(res.data?.shop));
  } catch (err) {
    dispatch(
      updateShopProfileFailure(err?.response?.data?.message || "Failed"),
    );
  }
};
