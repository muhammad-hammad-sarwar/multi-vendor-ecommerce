import api from "@/axios/api";
import { AppDispatch } from "../store";
import {
  getWithdrawRequestsStart,
  getWithdrawRequestsSuccess,
  getWithdrawRequestsFailure,
  approveWithdrawRequestStart,
  approveWithdrawRequestSuccess,
  approveWithdrawRequestFailure,
} from "../slices/withdraw";

export const getWithdrawRequests =
  (admin = false) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(getWithdrawRequestsStart());

      const { data } = await api.get(admin ? "/withdraw" : "/withdraw/seller");

      dispatch(getWithdrawRequestsSuccess(data.withdrawRequests));
    } catch (err) {
      dispatch(
        getWithdrawRequestsFailure(
          err?.response?.data?.message || "Something went wrong",
        ),
      );
    }
  };

export const approveWithdrawRequest =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(approveWithdrawRequestStart());

      const { data } = await api.patch(`/admin/withdraws/${id}/approve`);

      dispatch(approveWithdrawRequestSuccess(data.withdraw));
    } catch (err: any) {
      dispatch(
        approveWithdrawRequestFailure(
          err?.response?.data?.message || "Something went wrong",
        ),
      );
    }
  };
