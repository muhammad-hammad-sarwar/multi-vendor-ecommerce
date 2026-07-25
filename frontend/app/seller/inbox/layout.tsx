import SellerInboxInit from "@/redux/SellerInboxInit";
import { ReactNode } from "react";

interface SellerInboxLayoutProps {
  children: ReactNode;
}

export default function SellerInboxLayout({
  children,
}: SellerInboxLayoutProps) {
  return (
    <>
      {children}
      <SellerInboxInit />
    </>
  );
}
