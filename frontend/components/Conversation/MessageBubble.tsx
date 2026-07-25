import Image from "next/image";

export const MessageBubble = ({ msg, currentSenderId }) => {
  const isMine = currentSenderId === msg.sender;
  return (
    <div
      key={msg._id}
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
    >
      {msg?.text ? (
        <div
          className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm wrap-break-word ${
            isMine
              ? "bg-black text-white rounded-br-sm"
              : "bg-green-500 text-white rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>
      ) : (
        msg?.image?.url && (
          <Image
            src={msg?.image?.url}
            alt={"Message"}
            width={100}
            height={140}
            className="rounded-md cursor-pointer"
            unoptimized
          />
        )
      )}
    </div>
  );
};
