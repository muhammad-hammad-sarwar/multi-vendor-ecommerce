import api from "@/axios/api";
import {
  createConversationFailure,
  createConversationStart,
  createConversationSuccess,
  getConversationsFailure,
  getConversationsStart,
  getConversationsSuccess,
} from "../slices/conversations";
import { AppDispatch } from "../store";

export const createConversation =
  (payload) => async (dispatch: AppDispatch) => {
    // payload = {sellerId, userId}
    try {
      dispatch(createConversationStart());

      const res = await api.post("/conversations", payload);

      dispatch(createConversationSuccess(res.data?.conversation));
      return res.data?.conversation;
    } catch (error) {
      dispatch(createConversationFailure(error?.response?.data?.message));
      throw error;
    }
  };

export const getConversations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getConversationsStart());

    const res = await api.get("/conversations");

    dispatch(getConversationsSuccess(res.data.conversations));
  } catch (error) {
    dispatch(getConversationsFailure(error?.response?.data?.message));
  }
};
