import ProtectedGuard from "@/components/Guards/ProtectedGuard";
import Header from "@/components/Layout/Header/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MultiVendor Ecommerce - Profile",
  description: "View or Edit your profile",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedGuard roles={["user"]}>
      <div className="bg-gray-100 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </ProtectedGuard>
  );
}
