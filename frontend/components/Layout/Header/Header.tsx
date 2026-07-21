"use client";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { CgHeart, CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi";
import { navItems } from "@/lib/utils/static";
import CategoriesDropDown from "./CategoriesDropDown";
import { ChevronRightIcon } from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import CartDrawer from "../Cart/CartDrawer";
import { WishlistDrawer } from "../Favourites/WishlistDrawer";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";

const activePage: Record<string, number> = {
  "/": 1,
  "/best-selling": 2,
  "/products": 3,
  "/events": 4,
  "/faq": 5,
};

export default function Header() {
  const { user, isAuthenticated } = useAppSelector((state) => state.user);
  const { loading, allProducts } = useAppSelector((state) => state.products);
  const { shop, isSeller } = useAppSelector((state) => state.shop);
  const { cartItems } = useAppSelector((store) => store.cart);
  const { wishlist } = useAppSelector((store) => store.wishlist);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const pathname = usePathname();
  const active = activePage[pathname];
  useBodyScrollLock(open);
  useBodyScrollLock(cartOpen);
  useBodyScrollLock(wishlistOpen);

  const filteredProducts = allProducts?.filter((product) =>
    product?.name?.toLowerCase()?.includes(search?.toLowerCase()),
  );

  useEffect(() => {}, [user]);

  return (
    <>
      <header className="w-full border-b bg-white">
        <div className="hidden md:flex md:items-center md:justify-between px-4 md:px-10 py-2">
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

          <div className="relative hidden md:flex items-center w-1/2 border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm"
            />
            {search ? (
              <FiX
                className="cursor-pointer text-gray-500"
                onClick={() => setSearch("")}
              />
            ) : (
              <BiSearch className="text-gray-500 text-lg" />
            )}
            {search.trim() && (
              <div className="absolute top-full left-0 hidden md:block mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                {filteredProducts.length ? (
                  filteredProducts.map((product) => (
                    <Link
                      onClick={() => {
                        setSearch("");
                      }}
                      key={product?._id}
                      href={`/products/${product?._id}`}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100"
                    >
                      <Image
                        src={`http://localhost:8000/uploads/${product?.images?.[0]}`}
                        alt={product?.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                        unoptimized
                      />

                      <span className="text-sm font-medium">
                        {product?.name}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {isSeller ? (
              <Link
                href={`/shop/${shop._id}`}
                className="hidden sm:flex items-center bg-[#000000] text-white hover:bg-gray-800 text-sm md:text-base font-bold px-4 py-3 rounded-lg transition"
              >
                Your Shop <ChevronRightIcon />
              </Link>
            ) : (
              <Link
                href={"/seller-login"}
                className="hidden sm:flex items-center bg-[#000000] text-white hover:bg-gray-800 text-sm md:text-base font-bold px-4 py-3 rounded-lg transition"
              >
                Become a Seller <ChevronRightIcon />
              </Link>
            )}

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
            <div
              onClick={() => setWishlistOpen(true)}
              className="cursor-pointer relative"
            >
              <CgHeart
                size={24}
                className="cursor-pointer hover:text-red-500 transition"
              />
              <div className="absolute -top-1 -right-2 text-white bg-green-600 rounded-full w-5 h-5 text-sm flex items-center justify-center">
                {wishlist?.length}
              </div>
            </div>
            <div
              onClick={() => setCartOpen(true)}
              className="cursor-pointer relative"
            >
              <BsCart size={24} className="hover:text-blue-600 transition" />
              <div className="absolute -top-1 -right-2 text-white bg-green-600 rounded-full w-5 h-5 text-sm flex items-center justify-center">
                {cartItems?.length}
              </div>
            </div>

            <Link href={isAuthenticated ? "/profile" : "/login"}>
              <div className="w-7.5 h-7.5 rounded-full overflow-hidden flex items-center justify-center">
                {isAuthenticated && user && user?.avatar ? (
                  <Image
                    width={34}
                    height={34}
                    src={`http://localhost:8000/uploads/${user?.avatar}`}
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

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-5 border-b">
          <button onClick={() => setOpen(true)} className="text-2xl">
            <FiMenu />
          </button>

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

          <BsCart onClick={() => setCartOpen(true)} className="text-xl" />
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 ${
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

        <div className="relative p-4 border-b">
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent outline-none text-sm"
            />
            {search ? (
              <FiX className="cursor-pointer" onClick={() => setSearch("")} />
            ) : (
              <BiSearch className="text-gray-500 text-lg" />
            )}
          </div>

          {search.trim() && (
            <div className="absolute top-full left-0 md:hidden mt-2 w-full bg-white border rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {filteredProducts.length ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product?._id}
                    href={`/products/${encodeURIComponent(product?.name)}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100"
                  >
                    <Image
                      src={`http://localhost:8000/uploads/${product?.images?.[0]}`}
                      alt={product?.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                      unoptimized
                    />

                    <span className="text-sm font-medium">{product?.name}</span>
                  </Link>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>
          )}
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

          {isAuthenticated ? (
            <Link onClick={() => setOpen(false)} href={"/profile"}>
              <div className="mx-auto w-18 h-18 rounded-full overflow-hidden flex items-center mt-3">
                <Image
                  width={80}
                  height={80}
                  src={`http://localhost:8000/uploads/${user?.avatar}`}
                  alt="avatar"
                  className="object-cover"
                  unoptimized // remove this when use cloudinary
                />
              </div>
            </Link>
          ) : (
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
          )}
        </div>
      </div>

      {cartOpen && <CartDrawer setOpen={setCartOpen} />}
      {wishlistOpen && (
        <WishlistDrawer open={wishlistOpen} setOpen={setWishlistOpen} />
      )}
    </>
  );
}
