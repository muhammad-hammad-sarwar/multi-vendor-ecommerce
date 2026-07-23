import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  addUser,
  loadUserFailed,
  loadUserStart,
  loadUserSuccess,
  updateProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
} from "../slices/user";
import { loadShopFailed, loadShopStart, loadShopSuccess } from "../slices/shop";

export const addUserWhileLogin = (user) => (dispatch: AppDispatch) => {
  dispatch(addUser(user));
};

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

export const updateUserProfileAvatar =
  (formData: FormData) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProfileStart());
      const res = await api.put("/profile/avatar", formData, {
        withCredentials: true,
      });

      dispatch(updateProfileSuccess(res.data?.user));
    } catch (err) {
      dispatch(updateProfileFailure(err?.response?.data?.message || "Failed"));
    }
  };

export const updateUserProfile = (payload) => async (dispatch: AppDispatch) => {
  try {
    dispatch(updateProfileStart());
    const res = await api.put("/profile", payload, {
      withCredentials: true,
    });

    dispatch(updateProfileSuccess(res.data?.user));
  } catch (err) {
    dispatch(updateProfileFailure(err?.response?.data?.message || "Failed"));
  }
};

export const updateUserProfilePassword =
  (payload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProfileStart());
      const res = await api.put("/profile/password", payload, {
        withCredentials: true,
      });

      dispatch(updateProfileSuccess(res.data?.user));
    } catch (err) {
      dispatch(updateProfileFailure(err?.response?.data?.message || "Failed"));
    }
  };

export const updateUserProfileAddresses =
  (payload) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateProfileStart());
      const res = await api.put("/profile/addresses", payload, {
        withCredentials: true,
      });

      dispatch(updateProfileSuccess(res.data?.user));
    } catch (err) {
      // console.dir(err);
      dispatch(updateProfileFailure(err?.response?.data?.message || "Failed"));
    }
  };

export const deleteUserProfileAddress =
  (payload) => async (dispatch: AppDispatch) => {
    try {
      console.log(payload);
      dispatch(updateProfileStart());
      const res = await api.delete(`/profile/addresses/${payload}`, {
        withCredentials: true,
      });

      dispatch(updateProfileSuccess(res.data?.user));
    } catch (err) {
      // console.dir(err);
      dispatch(updateProfileFailure(err?.response?.data?.message || "Failed"));
    }
  };
