"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { formatDistanceToNow } from "date-fns";
import { ConversationListSkeleton } from "./ConversationListSkeleton";
import {
  setConversation,
  updateLastMessageUser,
} from "@/redux/slices/conversations";
import { useEffect, useState } from "react";
import { socket } from "@/socket/socket";
import clsx from "clsx";

export default function ConversationList() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAppSelector((state) => state.user);
  const { conversations, loading, error } = useAppSelector(
    (state) => state.conversation,
  );

  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      if (message?.receiverId != user?._id || !Boolean(user?._id)) return;
      console.log("GetMessage", message);
      dispatch(updateLastMessageUser(message));
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [user?._id]);

  if (loading || (!error && !conversations)) {
    return <ConversationListSkeleton />;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-5 py-4">
        <h2 className="text-xl font-bold">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations?.length === 0 ? (
          <div className="flex h-full items-center justify-center p-6 text-center text-gray-500">
            No conversations yet.
          </div>
        ) : (
          conversations?.map((conversation) => {
            const seller = conversation.seller;
            const isActive = params?.slug === conversation._id;

            return (
              <Link
                key={conversation._id}
                onClick={() => dispatch(setConversation(conversation))}
                href={`/conversation/${conversation._id}`}
                className={`flex items-center gap-4 border-b px-5 py-4 transition ${
                  isActive ? "bg-green-50" : "hover:bg-gray-50"
                }`}
              >
                <div className="relative">
                  <Image
                    src={seller?.avatar?.url}
                    alt={seller?.name}
                    width={52}
                    height={52}
                    unoptimized
                    className="h-13 w-13 rounded-full object-cover"
                  />
                  <span
                    className={clsx(
                      "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
                      onlineUsers.find((u) => u.userId == seller?._id)
                        ? "bg-green-500"
                        : "bg-gray-400",
                    )}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <h3 className="truncate font-semibold text-gray-900">
                      {seller?.name}
                    </h3>
                    {conversation.lastMessage && (
                      <p className="text-gray-500 text-sm">{`${formatDistanceToNow(new Date(conversation.lastMessageAt))}`}</p>
                    )}
                  </div>

                  <p className="truncate text-sm text-gray-500">
                    {conversation.lastMessage || "Start a conversation"}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
