"use client";
import { useSellerInbox } from "./hooks/useSellerInbox";
import { useSellerSocket } from "./hooks/useSellerSocket";

export default function SellerInboxInit() {
  useSellerInbox();
  useSellerSocket();
  return null;
}
