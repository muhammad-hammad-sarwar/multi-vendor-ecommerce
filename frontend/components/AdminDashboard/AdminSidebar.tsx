"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdStorefront } from "react-icons/md";

export const adminDashboardTabs: {
  name: string;
  url: string;
  icon: IconType;
}[] = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: FiGrid,
  },
  {
    name: "All Orders",
    url: "/admin/orders",
    icon: FiShoppingBag,
  },
  {
    name: "All Sellers",
    url: "/admin/sellers",
    icon: MdStorefront,
  },
  {
    name: "All Users",
    url: "/admin/users",
    icon: FiUsers,
  },
  {
    name: "All Products",
    url: "/admin/products",
    icon: FiPackage,
  },
  {
    name: "All Events",
    url: "/admin/events",
    icon: FiCalendar,
  },
  {
    name: "Withdrawal Requests",
    url: "/admin/withdraw",
    icon: HiOutlineCurrencyDollar,
  },
  {
    name: "Settings",
    url: "/admin/settings",
    icon: IoSettingsOutline,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 h-[calc(100vh-64px)] w-18 md:w-64 border-r bg-white shadow-sm">
      <nav className="py-4">
        {adminDashboardTabs.map((tab) => {
          const Icon = tab.icon;
          const active = pathname === tab.url;

          return (
            <Link
              key={tab.name}
              href={tab.url}
              className={`flex w-full items-center justify-center gap-4 px-5 py-3 transition-colors md:justify-start ${
                active
                  ? "border-r-4 border-blue-600 bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="shrink-0 text-xl" />

              <span className="hidden text-sm font-medium md:block">
                {tab.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
