import AdminGuard from "@/components/AdminDashboard/AdminGuard";
import AdminHeader from "@/components/AdminDashboard/AdminHeader";
import AdminSidebar from "@/components/AdminDashboard/AdminSidebar";
import AdminInit from "@/redux/AdminInit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MultiVendor Ecommerce - Admin",
  description: "Manage the marketplace",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AdminGuard>
        <AdminHeader />
        <section className="flex h-[calc(100vh-64px)] bg-gray-100">
          <AdminSidebar />

          <main className="flex-1 min-w-0 p-5 md:p-8 overflow-y-auto">
            <div className="min-h-[80vh] rounded-xl border bg-white p-6 shadow-sm">
              {children}
            </div>
          </main>
        </section>

        <AdminInit />
      </AdminGuard>
    </>
  );
}
