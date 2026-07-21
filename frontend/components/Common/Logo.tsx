import { LucideStore } from "lucide-react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-2">
        <LucideStore className="text-3xl text-blue-600" />

        <div>
          <h1 className="text-xl font-bold">Vendora</h1>
          <p className="text-[9px] text-gray-500 tracking-widest uppercase">
            Marketplace
          </p>
        </div>
      </div>
    </Link>
  );
}
