"use client";
import CouponsPage from "@/components/SellerDashboard/CouponsPage/CouponsPage";
import CreateEvent from "@/components/SellerDashboard/CreateEvent/CreateEvent";
import CreateProduct from "@/components/SellerDashboard/CreateProduct/CreateProduct";
import AllProducts from "@/components/SellerDashboard/AllProducts/AllProducts";
import { useState } from "react";
import {
  FiGrid,
  FiShoppingBag,
  FiPackage,
  FiPlusSquare,
  FiCalendar,
  FiDollarSign,
  FiMessageSquare,
  FiTag,
  FiRotateCcw,
  FiSettings,
} from "react-icons/fi";
import AllEvents from "@/components/SellerDashboard/AllEvents/AllEvents";
import SellerSettings from "@/components/SellerDashboard/SellerSettings/SellerSettings";

const tabs = [
  { name: "Dashboard", icon: FiGrid },
  { name: "All Orders", icon: FiShoppingBag },
  { name: "All Products", icon: FiPackage },
  { name: "Create Product", icon: FiPlusSquare },
  { name: "All Events", icon: FiCalendar },
  { name: "Create Event", icon: FiPlusSquare },
  { name: "Withdraw Money", icon: FiDollarSign },
  { name: "Shop Inbox", icon: FiMessageSquare },
  { name: "Discount Codes", icon: FiTag },
  { name: "Refunds", icon: FiRotateCcw },
  { name: "Settings", icon: FiSettings },
];

export default function SellerDashboard() {
  // const [active, setActive] = useState("Dashboard");
  const [active, setActive] = useState("Create Event");

  return (
    <section className="flex min-h-screen bg-gray-100">
      <aside className="sticky top-0 h-screen w-18 md:w-64 bg-white border-r shadow-sm">
        <nav className="py-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.name}
                onClick={() => setActive(tab.name)}
                className={`w-full flex items-center justify-center md:justify-start gap-4 px-5 py-3 transition-colors
                ${
                  active === tab.name
                    ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="text-xl shrink-0" />

                <span className="hidden md:block text-sm font-medium">
                  {tab.name}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8">
        <div className="rounded-xl bg-white shadow-sm border min-h-[85vh] p-6">
          {/* <h1 className="text-3xl font-bold">{active}</h1>
          <p className="mt-2 text-gray-500">This is the {active} page.</p> */}

          {active === "Create Product" && <CreateProduct />}
          {active === "Create Event" && <CreateEvent />}
          {active === "Discount Codes" && <CouponsPage />}
          {active === "All Products" && <AllProducts />}
          {active === "All Events" && <AllEvents />}
          {active === "Settings" && <SellerSettings />}
        </div>
      </main>
    </section>
  );
}
