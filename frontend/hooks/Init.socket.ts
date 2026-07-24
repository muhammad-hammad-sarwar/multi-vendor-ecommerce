"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { socket } from "../socket/socket";

export default function InitSocket() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isSeller, shop } = useAppSelector((state) => state.shop);

  useEffect(() => {
    const id = isAuthenticated ? user?._id : isSeller ? shop?._id : null;

    if (!id) return;

    if (!socket.connected) {
      socket.connect();
    }

    const register = () => {
      socket.emit("addUser", id);
    };

    if (socket.connected) {
      register();
    } else {
      socket.once("connect", register);
    }

    return () => {
      socket.off("connect", register);
    };
  }, [isAuthenticated, isSeller, user?._id, shop?._id]);

  return null;
}
