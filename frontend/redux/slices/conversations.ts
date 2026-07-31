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

interface IOnlineUser {
  userId: string;
  socketId: string;
}

interface ConversationState {
  loading: boolean;
  error: string | null;
  conversation: Conversation | null;
  conversations: Conversation[];

  // Seller
  sellerLoading: boolean;
  sellerError: string | null;
  sellerConversations: Conversation[];
  sellerConversation: Conversation | null;

  // Online
  onlineUsers: IOnlineUser[]; // For sellers
  onlineSellers: IOnlineUser[]; // For users
}

const initialState: ConversationState = {
  loading: false,
  error: null,
  conversation: null,
  conversations: null,

  // Seller
  sellerLoading: false,
  sellerError: null,
  sellerConversations: null,
  sellerConversation: null,
  onlineUsers: null,
  onlineSellers: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    // Online Users and Sellers
    setSellerOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
      // console.log(state.onlineUsers);
    },

    setUserOnlineSellers(state, action) {
      state.onlineSellers = action.payload;
    },

    updateLastMessageUser: (state, action) => {
      const message = action.payload;
      // console.log(message);

      const index = state.conversations.findIndex(
        (c) => c._id === message.conversation,
      );

      if (index === -1) return;

      state.conversations[index].lastMessage = message.text;
      state.conversations[index].lastMessageAt = message.createdAt;

      const conversation = state.conversations.splice(index, 1)[0];
      // removes the current convo and then add it at top
      state.conversations.unshift(conversation);
    },

    updateSellerLastMessage: (state, action) => {
      const message = action.payload;

      const index = state.sellerConversations.findIndex(
        (c) => c._id === message.conversation,
      );
      if (index === -1) return;

      state.sellerConversations[index].lastMessage = message.text;
      state.sellerConversations[index].lastMessageAt = message.createdAt;

      const conversation = state.sellerConversations.splice(index, 1)[0];
      // removes the current convo and then add it at top
      state.sellerConversations.unshift(conversation);
    },

    setConversation: (state, action) => {
      state.conversation = action.payload;
    },

    setSellerConversation: (state, action) => {
      state.sellerConversation = action.payload;
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

    getSellerConversationsStart(state) {
      state.sellerLoading = true;
      state.sellerError = null;
    },

    getSellerConversationsSuccess(state, action) {
      state.sellerLoading = false;
      state.sellerConversations = action.payload;
    },

    getSellerConversationsFailure(state, action) {
      state.sellerLoading = false;
      state.sellerError = action.payload;
      toast.error(action.payload);
    },

    clearConversation(state) {
      state.conversation = null;
      state.error = null;
    },
  },
});

export const {
  setSellerOnlineUsers,
  setUserOnlineSellers,

  setConversation,
  createConversationStart,
  createConversationSuccess,
  createConversationFailure,
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  clearConversation,
  updateLastMessageUser,

  getSellerConversationsStart,
  getSellerConversationsSuccess,
  getSellerConversationsFailure,
  setSellerConversation,
  updateSellerLastMessage,
} = conversationSlice.actions;

export default conversationSlice.reducer;
