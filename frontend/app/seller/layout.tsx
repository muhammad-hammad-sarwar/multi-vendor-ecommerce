import SellerHeader from "@/components/SellerDashboard/SellerHeader";
import SellerSidebar from "@/components/SellerDashboard/SellerSidebar";
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
      <section className="flex min-h-screen bg-gray-100">
        <SellerSidebar />

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <div className="rounded-xl bg-white shadow-sm border min-h-[85vh] p-6">
            {children}
          </div>
        </main>
      </section>
    </>
  );
}
