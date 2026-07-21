"use client";
import Link from "next/link";
import {
  FiGrid,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiCalendar,
} from "react-icons/fi";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Logo from "../Common/Logo";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";

export default function AdminHeader() {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  return (
    <header className="h-16 border-b bg-white">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-8">
        <Logo />

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/admin/dashboard">
              <FiGrid className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/orders">
              <FiShoppingBag className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/users">
              <FiUsers className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/products">
              <FiPackage className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/events">
              <FiCalendar className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/withdraw">
              <HiOutlineCurrencyDollar className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/admin/settings">
              <IoSettingsOutline className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>
          </div>

          <Link href={isAuthenticated ? "/profile" : "/login"}>
            {isAuthenticated ? (
              <div className="w-7.5 h-7.5 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  width={34}
                  height={34}
                  src={`http://localhost:8000/uploads/${user?.avatar}`}
                  alt="avatar"
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : (
              <CgProfile
                size={26}
                className="font-light cursor-pointer text-gray-600 transition"
              />
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
