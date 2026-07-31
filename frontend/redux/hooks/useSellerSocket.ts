"use client";
import { useEffect } from "react";
import { socket } from "@/socket/socket";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setSellerOnlineUsers,
  updateSellerLastMessage,
} from "@/redux/slices/conversations";
import { appendSellerMessage } from "../slices/message";

export const useSellerSocket = () => {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);
  const { sellerConversation } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    if (!shop?._id) return;

    const handleUsers = (users) => {
      dispatch(setSellerOnlineUsers(users?.length > 0 ? users : []));
    };

    const handleMessage = (message) => {
      // Ignore messages not meant for this seller
      console.log("Message from useSellerSocket.ts", message);
      if (message.receiverId !== shop._id) return;

      dispatch(updateSellerLastMessage(message));
      console.log("message.conversation", message.conversation);
      console.log("sellerConversation?._id", sellerConversation?._id);
      console.log(
        "message.conversation === sellerConversation?._id",
        message.conversation === sellerConversation?._id,
      );
      if (message.conversation === sellerConversation?._id) {
        dispatch(appendSellerMessage(message));
      }
    };

    socket.on("getUsers", handleUsers);
    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getUsers", handleUsers);
      socket.off("getMessage", handleMessage);
    };
  }, [dispatch, shop?._id, sellerConversation?._id]);
};
