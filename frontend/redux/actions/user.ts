import api from "@/axios/api";
import { AppDispatch } from "../store";
import { loadUserFailed, loadUserStart, loadUserSuccess } from "../slices/user";
import { loadShopFailed, loadShopStart, loadShopSuccess } from "../slices/shop";

export const loadUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadUserStart());

    const res = await api.get("/auth/me", { withCredentials: true });

    dispatch(loadUserSuccess(res.data.user));
  } catch (err: any) {
    dispatch(loadUserFailed(err?.response?.data?.message || "Failed"));
  }
};

export const loadShop = (shopId?: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadShopStart());
    const url = `/shop${shopId ? shopId : ""}`;
    const res = await api.get("/shop", { withCredentials: true });

    dispatch(loadShopSuccess(res.data.shop));
  } catch (err) {
    dispatch(loadShopFailed(err?.response?.data?.message || "Failed"));
  }
};
