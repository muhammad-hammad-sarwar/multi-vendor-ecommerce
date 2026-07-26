import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUser } from "./user";
import { IShop } from "./shop";

interface Message {
  _id: string;
  conversation: string;
  sender: any;
  receiverId: string;
  text: string;
  image?: any;
  createdAt: string;
}

interface MessageState {
  // Seller
  sellerMessages: Message[];
  sellerMessagesLoading: boolean;
  sellerMessagesError: string | null;

  // User
  userMessages: Message[];
  userMessagesLoading: boolean;
  userMessagesError: string | null;
}

const initialState: MessageState = {
  // Seller
  sellerMessages: null,
  sellerMessagesLoading: false,
  sellerMessagesError: null,

  // User
  userMessages: null,
  userMessagesLoading: false,
  userMessagesError: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getMessagesStart(state, action) {
      if (action.payload?.role === "seller") {
        state.sellerMessagesLoading = true;
        return;
      }

      state.userMessagesLoading = true;
    },

    getMessagesSuccess(state, action) {
      if (action.payload?.role === "seller") {
        state.sellerMessagesLoading = false;
        state.sellerMessages = action.payload?.messages;
        return;
      }
      state.userMessagesLoading = false;
      state.userMessages = action.payload?.messages;
    },

    getMessagesFailure(state, action) {
      if (action.payload?.role === "seller") {
        state.sellerMessagesLoading = false;
        state.sellerMessagesError = action.payload?.error;
        return;
      }
      state.userMessagesLoading = false;
      state.userMessagesError = action.payload?.messages;
      toast.error(action.payload?.error);
    },

    clearConversation(state) {
      // state.messages = null;
      // state.error = null;
    },
  },
});

export const {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesFailure,
  clearConversation,
} = messageSlice.actions;

export default messageSlice.reducer;
