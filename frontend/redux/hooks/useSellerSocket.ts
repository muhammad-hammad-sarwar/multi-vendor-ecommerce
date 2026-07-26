"use client";
import { useEffect } from "react";
import { socket } from "@/socket/socket";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setSellerOnlineUsers,
  updateSellerLastMessage,
} from "@/redux/slices/conversations";

export const useSellerSocket = () => {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);

  useEffect(() => {
    if (!shop?._id) return;

    const handleUsers = (users) => {
      dispatch(setSellerOnlineUsers(users));
    };

    const handleMessage = (message) => {
      // Ignore messages not meant for this seller
      console.log("Message from useSellerSocket.ts", message);
      if (message.receiverId !== shop._id) return;

      dispatch(updateSellerLastMessage(message));
    };

    socket.on("getUsers", handleUsers);
    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getUsers", handleUsers);
      socket.off("getMessage", handleMessage);
    };
  }, [dispatch, shop?._id]);
};
