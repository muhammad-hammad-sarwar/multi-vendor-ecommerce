"use client";
import Image from "next/image";

interface ChatItemProps {
  name: string;
  avatar: string;
  lastMessage: string;
  isOnline: boolean;
  onClick?: () => void;
}

export default function ShopInbox() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Shop Inbox</h1>
      <p className="mt-2 mb-8 text-gray-500">
        View and manage all your shop conversations in one place.
      </p>

      <ChatItem
        name="Muhammad Hammad"
        lastMessage="We'll see this tommorrow."
        isOnline={true}
        onClick={() => {}}
        avatar="http://localhost:8000/uploads/e975bee3e6937538b69ae5d65b9c0b56.jpg"
      />
    </>
  );
}

function ChatItem({
  name,
  avatar,
  lastMessage,
  isOnline,
  onClick,
}: ChatItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-4 border rounded-md shadow border-gray-200 p-4 text-left transition hover:bg-gray-50"
    >
      <div className="relative">
        <Image
          src={avatar}
          alt={name}
          width={56}
          height={56}
          className="h-14 w-14 rounded-full object-cover"
          unoptimized
        />

        {isOnline && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-gray-900">
          {name}
        </h3>

        <p className="mt-1 truncate text-sm text-gray-500">{lastMessage}</p>
      </div>
    </button>
  );
}
