import api from "@/axios/api";
import {
  createConversationFailure,
  createConversationStart,
  createConversationSuccess,
  getConversationsFailure,
  getConversationsStart,
  getConversationsSuccess,
  getSellerConversationsFailure,
  getSellerConversationsStart,
  getSellerConversationsSuccess,
} from "../slices/conversations";
import { AppDispatch } from "../store";

export const createConversation =
  (payload) => async (dispatch: AppDispatch) => {
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

export const getSellerConversations = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(getSellerConversationsStart());

    const res = await api.get("/shop/conversations");

    dispatch(getSellerConversationsSuccess(res.data.conversations));
  } catch (error) {
    dispatch(getSellerConversationsFailure(error?.response?.data?.message));
  }
};
