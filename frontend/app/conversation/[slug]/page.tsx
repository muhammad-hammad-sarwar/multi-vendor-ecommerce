"use client";
import api from "@/axios/api";
import { MessageSkeleton } from "@/components/Conversation/MessageSkeleton";
import { getMessages } from "@/redux/actions/message";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setConversation } from "@/redux/slices/conversations";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiSend, FiImage } from "react-icons/fi";
import { toast } from "react-toastify";

interface Message {
  _id: string;
  text: string;
  sender: "me" | "other";
}
export default function CurrentConversationPage() {
  const params = useParams();
  const conversationId = params.slug;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { messages, loading, error } = useAppSelector((state) => state.message);
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const { isSeller, shop } = useAppSelector((state) => state.shop);
  const { conversation, conversations } = useAppSelector(
    (state) => state.conversation,
  );

  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    await api
      .post(`/messages/${params.slug}`, { text: message })
      .catch((error) => toast.error(error?.response?.data?.message));
    setMessage("");
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

    console.log(file);
  };

  useEffect(() => {
    dispatch(getMessages(params?.slug));
  }, [params?.slug]);

  useEffect(() => {
    if (!conversationId || !conversations?.length) return;

    const conversation = conversations?.find((c) => c._id === conversationId);

    if (conversation) {
      dispatch(setConversation(conversation));
    }
  }, [conversationId, conversations]);

  const currentSenderId = isAuthenticated
    ? user?._id
    : isSeller
      ? shop?._id
      : null;

  const otherPerson =
    conversation?.seller?._id === currentSenderId
      ? conversation?.user
      : conversation?.seller;

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-4 border-b px-5 py-3.5">
        <button
          onClick={() => router.push("/conversation")}
          className="cursor-pointer hover:bg-gray-100 w-8 h-8 flex items-center justify-center rounded-full"
        >
          <FiArrowLeft size={22} />
        </button>

        <Image
          src={`http://localhost:8000/uploads/${otherPerson?.avatar}`}
          alt={otherPerson?.avatar}
          width={52}
          height={52}
          unoptimized
          className="h-13 w-13 rounded-full object-cover"
        />

        <div>
          <h2 className="font-semibold text-gray-900">{otherPerson?.name}</h2>

          <p className="text-xs text-gray-500">
            {isSeller ? "Customer" : "Seller"}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
        {loading || (!error && !messages) ? (
          <MessageSkeleton />
        ) : messages?.length > 0 ? (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              msg={msg}
              currentSenderId={currentSenderId}
            />
          ))
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
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
            accept="image/*"
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
            onClick={handleSubmit}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700"
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const MessageBubble = ({ msg, currentSenderId }) => {
  const isMine = currentSenderId === msg.sender._id;
  return (
    <div
      key={msg._id}
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm wrap-break-word ${
          isMine
            ? "bg-black text-white rounded-br-sm"
            : "bg-green-500 text-white rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};
