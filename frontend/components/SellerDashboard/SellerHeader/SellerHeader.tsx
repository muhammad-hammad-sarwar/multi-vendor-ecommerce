"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FiShoppingBag,
  FiPackage,
  FiCalendar,
  FiMessageCircle,
  FiTag,
  FiGrid,
} from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

export default function SellerHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b">
      <div className="mx-auto flex h-full items-center justify-between px-4 md:px-8">
        <Link href={"/"}>
          <Image
            className="w-20 h-16"
            src={
              "https://cdn.dribbble.com/userupload/17039933/file/original-dbbc84c08bd6b4b49fc97827fa5be468.jpg?resize=752x&vertical=center"
            }
            width={80}
            height={80}
            alt="multi-vendor"
          />
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/seller">
              <FiGrid className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/orders">
              <FiShoppingBag className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/products">
              <FiPackage className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/events">
              <FiCalendar className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/coupons">
              <FiTag className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/messages">
              <FiMessageCircle className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>
          </div>

          {/* <Image
            src="/avatar.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover border"
          /> */}

          <Link href={"/shop"}>
            <CgProfile className="text-2xl text-gray-600 hover:text-blue-600 transition" />
          </Link>
        </div>
      </div>
    </header>
  );
}
