"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { formatDistanceToNow } from "date-fns";
import { ConversationListSkeleton } from "./ConversationListSkeleton";
import { setConversation } from "@/redux/slices/conversations";

export default function ConversationList() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const { conversations, loading, error } = useAppSelector(
    (state) => state.conversation,
  );

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
            const otherPerson = isAuthenticated
              ? conversation.seller
              : conversation.user;

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
                    src={`http://localhost:8000/uploads/${otherPerson.avatar}`}
                    alt={otherPerson.name}
                    width={52}
                    height={52}
                    unoptimized
                    className="h-13 w-13 rounded-full object-cover"
                  />

                  {/* Replace with actual online status later */}
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <h3 className="truncate font-semibold text-gray-900">
                      {otherPerson.name}
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
