"use client";
import { socket } from "@/socket/socket";
import api from "@/axios/api";
import { MessageSkeleton } from "@/components/Conversation/MessageSkeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  setConversation,
  updateLastMessage,
} from "@/redux/slices/conversations";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSend, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { MessageBubble } from "@/components/Conversation/MessageBubble";
import clsx from "clsx";

export default function SellerChatMessages() {
  const params = useParams();
  const conversationId = params.slug;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shop } = useAppSelector((state) => state.shop);
  const { conversation, conversations } = useAppSelector(
    (state) => state.conversation,
  );

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createMessageLoading, setCreateMessageLoading] = useState(false);
  const [error, setError] = useState(null);

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
      }
      if (file?.name) {
        console.log(file);
        formData.append("image", file);
      }

      const { data } = await api.post(`/messages/${params.slug}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      socket.emit("sendMessage", {
        messageId: data?.message?._id,
        senderId: shop?._id,
        receiverId: user?._id,
        text: data?.message?.text,
        conversation: conversationId,
        createdAt: data?.message?.createdAt,
        image: data?.message?.image,
      });
      dispatch(updateLastMessage(data?.message));
      setMessages((prev) => [...prev, data?.message]);
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
    (async () => {
      setLoading(true);
      try {
        const res = await api.get(`/messages/${params?.slug}`);
        setMessages(res?.data?.messages);
      } catch (error) {
        setError(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [params?.slug]);

  useEffect(() => {
    if (!conversationId || !conversations?.length) return;

    const conversation = conversations?.find((c) => c._id === conversationId);

    if (conversation) {
      dispatch(setConversation(conversation));
    }
  }, [conversationId, conversations]);

  useEffect(() => {
    const handleMessage = (message) => {
      console.log(message);
      setMessages((prev) => [...prev, message]);
      dispatch(updateLastMessage(message));
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, []);

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

        <Image
          src={user?.avatar?.url}
          alt={"Avatar"}
          width={52}
          height={52}
          unoptimized
          className="h-13 w-13 rounded-full object-cover"
        />

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

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-full border px-4 py-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="cursor-pointer text-gray-600 hover:text-black"
          >
            <FiImage size={22} />
          </button>

          <input
            ref={fileRef}
            type="file"
            hidden
            accept="jpg, jpeg, png, webp, avif"
            onChange={handleImageUpload}
          />

          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none"
          />

          <button
            disabled={createMessageLoading}
            onClick={() => handleSubmit()}
            className={clsx(
              "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white transition",
              createMessageLoading
                ? "bg-gray-400 hover:bg-gray-500 hover:cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700",
            )}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
