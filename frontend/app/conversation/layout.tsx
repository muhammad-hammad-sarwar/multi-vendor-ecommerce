import { ReactNode } from "react";
import ConversationList from "@/components/Conversation/ConversationList";
import Header from "@/components/Layout/Header/Header";
import ConversationInit from "@/redux/ConversationInit";

export default function ConversationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-full mx-auto h-[calc(100vh-170px)] p-6">
        <div className="flex h-full overflow-hidden rounded-2xl border bg-white shadow-sm">
          <aside className="hidden w-100 md:block shrink-0 border-r bg-white">
            <ConversationList />
          </aside>

          <main className="w-full min-w-0 flex-1">{children}</main>
        </div>
      </div>
      <ConversationInit />
    </>
  );
}
