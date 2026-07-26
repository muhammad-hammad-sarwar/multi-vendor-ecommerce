import api from "@/axios/api";
import {
  getMessagesFailure,
  getMessagesStart,
  getMessagesSuccess,
} from "../slices/message";
import { AppDispatch } from "../store";

export const getMessages = (id, role) => async (dispatch: AppDispatch) => {
  try {
    dispatch(getMessagesStart({ role }));

    const res = await api.get(`/messages/${role}/${id}`);

    dispatch(getMessagesSuccess({ messages: res.data.messages, role }));
  } catch (error) {
    dispatch(
      getMessagesFailure({ error: error?.response?.data?.message, role }),
    );
  }
};
