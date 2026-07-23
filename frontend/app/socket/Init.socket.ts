"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { socket } from "./socket";

export default function InitSocket() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isSeller, shop } = useAppSelector((state) => state.shop);

  useEffect(() => {
    !socket.connected && socket.connect();
    if (isAuthenticated && user._id) {
      socket.on("connect", () => {
        socket.emit("addUser", user._id);
      });
    }

    if (isSeller && shop._id) {
      socket.on("connect", () => {
        socket.emit("addUser", shop._id);
      });
    }
  }, [user?._id, shop?._id]);

  return null;
}
