"use client";
import api from "@/axios/api";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiCalendar,
  FiEdit2,
  FiLogOut,
  FiMapPin,
  FiPackage,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import ButtonLoader from "../Layout/ButtonLoader/ButtonLoader";

export default function ShopSidebarInfo({ isOwner, shop, totalProducts }) {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLogoutLoading(true);
    await api.post("/shop/logout");
    router.push("/seller-login");
  };

  return (
    <aside className="sticky top-10 w-80 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <Image
          src={`http://localhost:8000/uploads/${shop?.avatar}`}
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

            {/* <p>{shop.} / 5</p> */}
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
          <button className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-black h-12 font-medium text-white transition hover:opacity-90">
            <FiEdit2 />
            Edit Shop
          </button>

          <button
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center justify-center gap-2 rounded-lg bg-black h-12 font-medium text-white transition hover:opacity-90"
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
    </aside>
  );
}
