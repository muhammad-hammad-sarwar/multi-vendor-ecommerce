import { BiSearch } from "react-icons/bi";
import { navItems } from "@/lib/utils/static";
import Link from "next/link";
import { HiHeart } from "react-icons/hi2";
import { CgHeart, CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between px-10 py-5">
        <h1 className="font-semibold text-xl">Multi Vendor</h1>
        <div className="flex items-center justify-between p-2 rounded-sm border w-1/2">
          <input placeholder="Search Products..." className="outline-none" />
          <BiSearch />
        </div>
        <button className="bg-black text-white font-bold text-lg p-3 rounded-lg">
          Become a Seller
        </button>
      </div>
      <div>
        <div>
          <button>All Categories</button>
        </div>
        <div>
          {navItems.map((item, i) => (
            <Link href={item.url} key={i}>
              {item.title}
            </Link>
          ))}
        </div>
        <div>
          <CgHeart />
          <BsCart />
          <CgProfile />
        </div>
      </div>
    </header>
  );
}
