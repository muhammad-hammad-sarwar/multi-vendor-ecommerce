"use client";
import { useEffect } from "react";
import { sellerSocket as socket } from "@/socket/socket";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setOnlineUsers,
  updateSellerLastMessage,
} from "@/redux/slices/conversations";
import { appendSellerMessage } from "../slices/message";

export const useSellerSocket = () => {
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);
  const { sellerConversation } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    if (!shop?._id) return;

    const onConnect = () => {
      socket.emit("addUser", {
        id: shop._id,
        role: "seller",
      });
    };

    const onDisconnect = (reason: string) => {};

    const onReconnect = (attempt: number) => {
      socket.emit("addUser", {
        id: shop._id,
        role: "seller",
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.io.on("reconnect", onReconnect);

    if (!socket.connected) {
      socket.connect();
    } else {
      onConnect();
    }

    const handleUsers = (users) => {
      dispatch(setOnlineUsers(users?.length > 0 ? users : []));
    };

    socket.on("getUsers", handleUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.io.off("reconnect", onReconnect);
      socket.off("getUsers", handleUsers);

      socket.disconnect();
    };
  }, [shop?._id]);

  useEffect(() => {
    if (!shop?._id) return;

    const handleMessage = (message) => {
      if (message.receiverId !== shop._id) return;

      dispatch(updateSellerLastMessage(message));
      if (message.conversation === sellerConversation?._id) {
        dispatch(appendSellerMessage(message));
      }
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [dispatch, shop?._id, sellerConversation?._id]);
};
