"use client";
import api from "@/axios/api";
import ButtonLoader from "../Layout/ButtonLoader/ButtonLoader";
import { logout } from "@/redux/slices/shop";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { sellerSocket as socket } from "@/socket/socket";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiEdit2,
  FiLogOut,
  FiMapPin,
  FiMenu,
  FiPackage,
  FiPhone,
  FiStar,
  FiX,
} from "react-icons/fi";

export default function ShopSidebarInfo({
  isOwner,
  shop,
  totalProducts,
  averageRating,
}) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      await api.post("/shop/logout");

      socket.disconnect();
      dispatch(logout());

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      router.push("/seller-login");
      setLogoutLoading(false);
    }
  };

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center">
        <Image
          src={shop?.avatar?.url}
          alt={shop?.name}
          width={130}
          height={130}
          className="rounded-full object-cover border-4 border-blue-100"
          unoptimized
        />

        <h2 className="mt-5 text-2xl font-bold">{shop?.name}</h2>
      </div>

      <div className="mt-10 space-y-6">
        <div>
          <h3 className="font-semibold">Address</h3>

          <div className="mt-2 flex gap-2 text-gray-600">
            <FiMapPin className="mt-1 shrink-0" />
            <p>{shop?.address}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Phone Number</h3>

          <div className="mt-2 flex gap-2 text-gray-600">
            <FiPhone className="mt-1 shrink-0" />
            <p>{shop?.phoneNumber}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Total Products</h3>

          <div className="mt-2 flex gap-2 text-gray-600">
            <FiPackage className="mt-1" />
            <p>{totalProducts}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Shop Rating</h3>

          <div className="mt-2 flex gap-2 text-gray-600">
            <FiStar className="mt-1 text-yellow-500" />

            <p>
              {averageRating
                ? Number.isInteger(averageRating)
                  ? averageRating
                  : averageRating.toFixed(2)
                : 0}{" "}
              / 5
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Joined On</h3>

          <div className="mt-2 flex gap-2 text-gray-600">
            <FiCalendar className="mt-1" />
            <p>{shop?.createdAt?.slice(0, 10)}</p>
          </div>
        </div>
      </div>

      {isOwner && (
        <div className="mt-10 space-y-3">
          <Link className="block" href="/seller/settings">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-black h-12 text-white">
              <FiEdit2 />
              Edit Shop
            </button>
          </Link>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black h-12 text-white"
          >
            {logoutLoading ? (
              <ButtonLoader />
            ) : (
              <>
                <FiLogOut />
                Logout
              </>
            )}
          </button>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="md:hidden absolute mb-4 p-4">
        <button onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 p-6 overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center justify-between border-b pb-4">
          <h2 className="text-lg font-semibold">Shop Details</h2>

          <button onClick={() => setOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        <SidebarContent />
      </div>

      <aside className="hidden md:block sticky top-10 w-80 rounded-2xl border bg-white p-6 shadow-sm">
        <SidebarContent />
      </aside>
    </>
  );
}
