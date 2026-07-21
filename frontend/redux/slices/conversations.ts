import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { IUser } from "./user";
import { IShop } from "./shop";

interface Conversation {
  _id: string;
  user: IUser;
  seller: IShop;
  lastMessage: string;
  lastMessageAt: Date;
}

interface ConversationState {
  loading: boolean;
  error: string | null;
  conversation: Conversation | null;
  conversations: Conversation[];
}

const initialState: ConversationState = {
  loading: false,
  error: null,
  conversation: null,
  conversations: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },

    createConversationStart(state) {
      state.loading = true;
      state.error = null;
    },

    createConversationSuccess(state, action) {
      state.loading = false;
      state.conversation = action.payload;
    },

    createConversationFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },

    getConversationsStart(state) {
      state.loading = true;
      state.error = null;
    },

    getConversationsSuccess(state, action) {
      state.loading = false;
      state.conversations = action.payload;
    },

    getConversationsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      toast.error(action.payload);
    },

    clearConversation(state) {
      state.conversation = null;
      state.error = null;
    },
  },
});

export const {
  setConversation,
  createConversationStart,
  createConversationSuccess,
  createConversationFailure,
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  clearConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
