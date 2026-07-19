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
import { useAppSelector } from "@/redux/hooks/hooks";

export default function SellerHeader() {
  const { shop, isSeller } = useAppSelector((state) => state.shop);
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
            <Link href="/seller/dashboard">
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

            <Link href="/seller/coupon-codes">
              <FiTag className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>

            <Link href="/seller/inbox">
              <FiMessageCircle className="text-2xl text-gray-600 hover:text-blue-600 transition" />
            </Link>
          </div>

          <Link href={isSeller ? `/shop/${shop?._id}` : "/seller-login"}>
            <div className="w-7.5 h-7.5 rounded-full overflow-hidden flex items-center justify-center">
              {isSeller && shop && shop?.avatar ? (
                <Image
                  width={34}
                  height={34}
                  src={`http://localhost:8000/uploads/${shop?.avatar}`}
                  alt="avatar"
                  className="object-cover"
                  unoptimized // remove this when use cloudinary
                />
              ) : (
                <CgProfile
                  size={24}
                  className="cursor-pointer hover:text-gray-900 transition"
                />
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
