"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { socket } from "../socket/socket";

export default function InitSocket() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isSeller, shop } = useAppSelector((state) => state.shop);

  useEffect(() => {
    const sellerId = isSeller ? shop?._id : null;
    const userId = isAuthenticated ? user?._id : null;

    if (!userId && !sellerId) return;

    if (!socket.connected) {
      socket.connect();
    }

    const register = (id: string) => {
      id != null && socket.emit("addUser", id);
    };

    const handleConnect = () => {
      if (userId) register(userId);
      if (sellerId) register(sellerId);
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.once("connect", handleConnect);
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [isAuthenticated, isSeller, user?._id, shop?._id]);

  return null;
}
