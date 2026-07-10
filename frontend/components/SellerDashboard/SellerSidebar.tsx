"use client";
import { sellerDashboardTabs } from "@/lib/utils/static";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerSidebar() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 h-screen w-18 md:w-64 bg-white border-r shadow-sm">
      <nav className="py-4">
        {sellerDashboardTabs.map((tab, i) => {
          const Icon = tab.icon;
          const active = pathname === tab.url;

          return (
            <Link
              href={tab.url}
              key={tab.name}
              className={`w-full flex items-center justify-center md:justify-start gap-4 px-5 py-3 transition-colors
                  ${
                    active
                      ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
            >
              <Icon className="text-xl shrink-0" />

              <span className="hidden md:block text-sm font-medium">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
