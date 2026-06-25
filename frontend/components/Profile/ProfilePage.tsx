"use client";

import { useState } from "react";
import {
  FiUser,
  FiPackage,
  FiRefreshCcw,
  FiMail,
  FiTruck,
  FiLock,
  FiMapPin,
  FiLogOut,
} from "react-icons/fi";
import ProfileDetails from "./ProfileDetails/ProfileDetails";

const tabs = [
  { name: "Profile", icon: FiUser },
  { name: "Orders", icon: FiPackage },
  { name: "Refunds", icon: FiRefreshCcw },
  { name: "Inbox", icon: FiMail },
  { name: "Track Order", icon: FiTruck },
  { name: "Change Password", icon: FiLock },
  { name: "Address", icon: FiMapPin },
  { name: "Log out", icon: FiLogOut },
];

export default function ProfilePage() {
  const [active, setActive] = useState("Profile");

  return (
    <section className="min-h-screen bg-gray-100 flex">
      <aside className="bg-white border-r w-20 md:w-64 flex flex-col">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActive(tab.name)}
              className={`cursor-pointer flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="text-xl shrink-0" />

              <span className="hidden md:inline text-sm font-medium">
                {tab.name}
              </span>
            </button>
          );
        })}
      </aside>

      <main className="flex-1 p-6">
        <div className="rounded-xl p-6 min-h-75">
          {active === "Profile" ? <ProfileDetails /> : <>NON PROFILE</>}
        </div>
      </main>
    </section>
  );
}
