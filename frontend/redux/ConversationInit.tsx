"use client";
import useConversationSocket from "@/hooks/useConversationSocket";
import { useConversationInit } from "./hooks/useConversationInit";

export default function ConversationInit() {
  useConversationInit();
  useConversationSocket();
  return null;
}
