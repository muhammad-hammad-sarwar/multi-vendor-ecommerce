import api from "@/axios/api";
import { AppDispatch } from "../store";
import { loadUserFailed, loadUserStart, loadUserSuccess } from "../slices/user";

export const loadUserProfile = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadUserStart());

    const res = await api.get("/auth/me", { withCredentials: true });

    dispatch(loadUserSuccess(res.data.user));
  } catch (err: any) {
    dispatch(loadUserFailed(err?.response?.data?.message || "Failed"));
  }
};
