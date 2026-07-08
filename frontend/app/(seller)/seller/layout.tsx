import SellerHeader from "@/components/SellerDashboard/SellerHeader/SellerHeader";
import ReduxAppInit from "@/redux/ReduxAppInit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MultiVendor Ecommerce - Seller",
  description: "View or Edit your products",
};

export default function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100 flex flex-col">
      <SellerHeader />
      <main className="max-h-calc(100vh-20)">{children}</main>
      {/* <ReduxAppInit /> */}
    </div>
  );
}
