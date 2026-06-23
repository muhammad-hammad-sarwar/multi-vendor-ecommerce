"use client";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { CgHeart, CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { navItems } from "@/lib/utils/static";
import CategoriesDropDown from "./CategoriesDropDown";
import { ChevronRightIcon } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";

const activePage: Record<string, number> = {
  "/": 1,
  "/best-selling": 2,
  "/products": 3,
  "/events": 4,
  "/faq": 5,
};

export default function Header() {
  const { user, isAuthenticated, loading } = useAppSelector(
    (state) => state.user,
  );
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const active = activePage[pathname];
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <header className="w-full border-b bg-white">
        <div className="hidden md:flex md:items-center md:justify-between px-4 md:px-10 py-4">
          <Link href={"/"}>
            {/* <h1 className="text-lg md:text-xl font-semibold text-gray-900">
              Multi Vendor
            </h1> */}

            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="multi-vendor"
            />
          </Link>

          <div className="hidden md:flex items-center w-1/2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm"
            />
            <BiSearch className="text-gray-500 text-lg" />
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <button className="hidden sm:flex items-center bg-[#000000] text-white hover:bg-gray-800 text-sm md:text-base font-bold px-4 py-3 rounded-lg transition">
              Become a Seller <ChevronRightIcon />
            </button>

            <button className="md:hidden text-2xl">
              <FiMenu />
            </button>
          </div>
        </div>

        <div className="bg-gray-100 hidden md:flex items-center justify-between px-4 md:px-10 py-4">
          <CategoriesDropDown />

          <nav className="flex items-center gap-6 text-sm text-gray-700">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className={clsx(
                  active == i + 1
                    ? "text-blue-600"
                    : "hover:text-blue-600 transition",
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-gray-700 text-xl">
            <CgHeart className="cursor-pointer hover:text-red-500 transition" />
            <BsCart className="cursor-pointer hover:text-blue-600 transition" />
            {isAuthenticated && user && user.avatar ? (
              <Link href={"/profile"}>
                <div className="w-9 h-9 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    width={36}
                    height={36}
                    src={`http://localhost:8000/uploads/${user.avatar}`}
                    alt="avatar"
                    className="object-cover"
                    unoptimized // remove this when use cloudinary
                  />
                </div>
              </Link>
            ) : (
              <CgProfile
                size={36}
                className="cursor-pointer hover:text-gray-900 transition"
              />
            )}
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-5 border-b">
          <button onClick={() => setOpen(true)} className="text-2xl">
            <FiMenu />
          </button>

          <Link href="/">
            <h1 className="text-lg font-semibold">Multi Vendor</h1>
          </Link>

          <BsCart className="text-xl" />
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">Menu</h2>
          <button onClick={() => setOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <input
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm"
            />
            <BiSearch className="text-gray-500 text-lg" />
          </div>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-gray-700">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              onClick={() => setOpen(false)}
              className={clsx(
                active == i + 1 ? "text-blue-600" : "hover:text-blue-600",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 flex flex-col gap-3">
          <button className="bg-black text-white py-2 rounded-lg">
            Become a Seller
          </button>

          <div className="text-center">
            <Link
              className="hover:text-blue-600 hover:underline"
              href={"/login"}
            >
              Login
            </Link>
            {" / "}
            <Link
              className="hover:text-blue-600 hover:underline"
              href={"/sign-up"}
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
