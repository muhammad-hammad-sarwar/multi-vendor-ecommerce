"use client";
import { sellerSocket as socket } from "@/socket/socket";
import api from "@/axios/api";
import { MessageSkeleton } from "@/components/Conversation/MessageSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setSellerConversation,
  updateSellerLastMessage,
} from "@/redux/slices/conversations";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSend, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { MessageBubble } from "@/components/Conversation/MessageBubble";
import clsx from "clsx";
import { getMessages } from "@/redux/actions/message";
import { appendSellerMessage } from "@/redux/slices/message";

export default function SellerChatMessages() {
  const params = useParams();
  const conversationId = params.slug;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);
  const [createMessageLoading, setCreateMessageLoading] = useState(false);
  const {
    sellerConversation: conversation,
    sellerConversations: conversations,
    onlineUsers,
  } = useAppSelector((state) => state.conversation);

  const {
    sellerMessages: messages,
    sellerMessagesError: error,
    sellerMessagesLoading: loading,
  } = useAppSelector((state) => state.message);
  const [message, setMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (file?: File) => {
    if ((!message.trim() && !file) || createMessageLoading) return;

    try {
      setCreateMessageLoading(true);
      const formData = new FormData();
      if (message.trim()) {
        formData.append("text", message);
      } else {
        formData.append("text", "Image");
      }

      if (file?.name) {
        formData.append("image", file);
      }

      const { data } = await api.post(
        `/messages/seller/${params.slug}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      socket.emit("sendMessage", {
        messageId: data?.message?._id,
        senderId: shop?._id,
        receiverId: user?._id,
        text: data?.message?.text,
        conversation: conversationId,
        createdAt: data?.message?.createdAt,
        image: data?.message?.image,
        receiver: "user",
      });

      dispatch(updateSellerLastMessage(data?.message));
      if (conversationId === data?.message?.conversation)
        dispatch(appendSellerMessage(data?.message));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setMessage("");
      setCreateMessageLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    handleSubmit(file);
  };

  useEffect(() => {
    dispatch(getMessages(params?.slug, "seller"));
  }, [params?.slug]);

  useEffect(() => {
    if (!conversationId || !conversations?.length) return;
    const conversation = conversations?.find((c) => c._id === conversationId);
    if (conversation) dispatch(setSellerConversation(conversation));
  }, [conversationId, conversations]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages?.length]);

  if (loading || (!error && !messages && !conversation))
    return <MessageSkeleton />;
  if (error) return <>{error}</>;

  const user = conversation?.user;
  return (
    <div className="flex flex-col max-h-[73vh] min-h-[73vh]">
      <div className="flex items-center gap-4 border-b px-5 py-3.5">
        <button
          onClick={() => router.back()}
          className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full"
        >
          <FiArrowLeft size={22} />
        </button>

        <div className="relative">
          {user?.avatar?.url ? (
            <Image
              src={user.avatar.url}
              alt="Avatar"
              width={52}
              height={52}
              unoptimized
              className="h-13 w-13 rounded-full object-cover"
            />
          ) : null}

          <span
            className={clsx(
              "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white",
              onlineUsers?.find((u) => u?.userId == user?._id)
                ? "bg-green-500"
                : "bg-gray-400",
            )}
          />
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">{user?.name}</h2>

          <p className="text-xs text-gray-500">Customer</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {messages?.length > 0 ? (
          messages.map((msg) => (
            <div key={msg?._id}>
              <MessageBubble msg={msg} currentSenderId={shop?._id} />
              <div ref={bottomRef} />
            </div>
          ))
        ) : (
          <div className="flex h-[40vh] flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 text-5xl">📩</div>
            <h3 className="text-lg font-semibold text-gray-900">
              No chats... yet
            </h3>
            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Found something interesting? Send a message and start building
              your next deal.
            </p>
          </div>
        )}
      </div>

      <div className="border-t pt-2 sm:p-4">
        <div className="flex items-center gap-2 rounded-full border px-3 py-2 sm:gap-3 sm:px-4">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            <FiImage size={22} />
          </button>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-w-0 flex-1 bg-transparent text-sm outline-none sm:text-base"
          />

          <button
            disabled={createMessageLoading}
            onClick={() => handleSubmit()}
            className={clsx(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition",
              createMessageLoading
                ? "cursor-not-allowed bg-gray-400"
                : "cursor-pointer bg-green-600 hover:bg-green-700",
            )}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
