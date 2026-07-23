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
import ChangePassword from "./ChangePassword/ChangePassword";
import AddressDetails from "./AddressDetails/AddressDetails";
import Orders from "./Orders/Orders";
import Refunds from "./Refund/Refund";
import TrackOrders from "./TrackOrders/TrackOrders";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/axios/api";
import { logout } from "@/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { LuLayoutDashboard } from "react-icons/lu";
import Link from "next/link";
import { socket } from "@/app/socket/socket";

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logged out successfully");
      dispatch(logout());
      socket.disconnect();
      router.push("/");
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleInbox = () => {
    router.push("/conversation");
  };

  return (
    <section className=" flex p-3 md:px-10 md:py-6">
      <aside className="bg-white border-r w-16 md:w-60 flex flex-col h-90 md:h-100 rounded-lg">
        {user && user.role === "admin" && (
          <Link href={"/admin/dashboard"}>
            <button
              className={
                "cursor-pointer flex items-center gap-3 px-4 py-3 transition"
              }
            >
              <LuLayoutDashboard className="text-xl shrink-0" />

              <span className="hidden md:inline text-start text-sm font-medium">
                Admin Dashboard
              </span>
            </button>
          </Link>
        )}
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.name;

          return (
            <button
              key={tab.name}
              onClick={
                tab.name == "Log out"
                  ? handleLogout
                  : tab.name == "Inbox"
                    ? handleInbox
                    : () => setActive(tab.name)
              }
              className={`cursor-pointer flex items-center gap-3 px-4 py-3 transition ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="text-xl shrink-0" />

              <span className="hidden md:inline text-start text-sm font-medium">
                {tab.name}
              </span>
            </button>
          );
        })}
      </aside>

      <main className="min-w-0 flex-1 px-6">
        {active === "Profile" && <ProfileDetails />}
        {active === "Change Password" && <ChangePassword />}
        {active === "Address" && <AddressDetails />}
        {active === "Orders" && <Orders />}
        {active === "Refunds" && <Refunds />}
        {active === "Track Order" && <TrackOrders />}
      </main>
    </section>
  );
}
