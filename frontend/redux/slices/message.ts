import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUser } from "./user";
import { IShop } from "./shop";

interface Message {
  _id: string;
  sender: string;
  text: string;
}

interface MessageState {
  loading: boolean;
  error: string | null;
  messages: Message[];
}

const initialState: MessageState = {
  loading: false,
  error: null,
  messages: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    getMessagesStart(state) {
      state.loading = true;
      state.error = null;
    },

    getMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },

    getMessagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },

    clearConversation(state) {
      state.messages = null;
      state.error = null;
    },
  },
});

export const {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  clearConversation,
  addMessage,
} = messageSlice.actions;

export default messageSlice.reducer;
