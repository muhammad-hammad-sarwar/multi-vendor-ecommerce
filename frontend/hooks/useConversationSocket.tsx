"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { userSocket } from "../socket/socket";
import { setOnlineSellers } from "@/redux/slices/conversations";

export default function useConversationSocket() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userId = isAuthenticated ? user?._id : null;

    const handleSellers = (users) => {
      dispatch(setOnlineSellers(users?.length > 0 ? users : []));
    };

    if (!userId) return;

    if (!userSocket.connected) {
      userSocket.connect();
    }

    const onUserConnect = () => {
      userSocket.emit("addUser", {
        id: userId,
        role: "user",
      });
    };

    userSocket.on("connect", onUserConnect);
    userSocket.on("getUsers", handleSellers);

    return () => {
      userSocket.off("getUsers", handleSellers);
      userSocket.off("connect", onUserConnect);
    };
  }, [isAuthenticated, user?._id]);

  return null;
}
