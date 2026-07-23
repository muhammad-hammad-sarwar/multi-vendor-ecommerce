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
    updateLastMessage: (state, action) => {
      const message = action.payload;

      const index = state.conversations.findIndex(
        (c) => c._id === message.conversationId,
      );

      if (index === -1) return;

      state.conversations[index].lastMessage = message.text;
      state.conversations[index].lastMessageAt = message.createdAt;

      const conversation = state.conversations.splice(index, 1)[0];
      // removes the current convo and then add it at top
      state.conversations.unshift(conversation);
    },
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
  updateLastMessage,
} = conversationSlice.actions;

export default conversationSlice.reducer;
