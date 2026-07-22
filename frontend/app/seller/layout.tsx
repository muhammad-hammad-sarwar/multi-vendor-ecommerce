import SellerHeader from "@/components/SellerDashboard/SellerHeader";
import SellerSidebar from "@/components/SellerDashboard/SellerSidebar";
import SellerInit from "@/redux/SellerInit";
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
    <>
      <SellerHeader />
      <section className="flex h-[calc(100vh-64px)] bg-gray-100">
        <SellerSidebar />

        <main className="flex-1 min-w-0 p-5 md:p-8 overflow-y-auto">
          <div className="min-h-[80vh] rounded-xl border bg-white p-6 shadow-sm">
            {children}
          </div>
        </main>
      </section>
      <SellerInit />
    </>
  );
}
