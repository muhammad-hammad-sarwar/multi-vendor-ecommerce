import ConversationList from "@/components/Conversation/ConversationList";

export default function ConversationPage() {
  return (
    <>
      <div className="h-full md:hidden">
        <ConversationList />
      </div>

      <div className="hidden h-full items-center justify-center px-6 md:flex">
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h8M8 14h5m-9 7 2.5-3A9 9 0 1 1 21 12a9 9 0 0 1-9 9H4Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">No chats... yet</h1>

          <p className="mx-auto mt-3 max-w-sm text-gray-500">
            Found something interesting? Send a message and start building your
            next deal. Your conversations will appear here.
          </p>
        </div>
      </div>
    </>
  );
}
