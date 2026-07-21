import api from "@/axios/api";
import {
  getMessagesFailure,
  getMessagesStart,
  getMessagesSuccess,
} from "../slices/message";
import { AppDispatch } from "../store";

export const getMessages = (id) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getMessagesStart());

    const res = await api.get(`/messages/${id}`);

    dispatch(getMessagesSuccess(res.data.messages));
  } catch (error) {
    dispatch(getMessagesFailure(error?.response?.data?.message));
  }
};
