"use client";

import { useState } from "react";
import Image from "next/image";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { categoriesData } from "@/lib/utils/static";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";

interface Category {
  id: number;
  title: string;
  subTitle: string;
  image_Url: string;
}

export default function CategoriesDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex items-center gap-2 text-sm font-medium px-3 py-2 border rounded-md hover:bg-gray-200"
      >
        <CgMenuRight />
        All Categories
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {open && (
        <div className="absolute left-0 top-12 w-[90vw] md:w-150 lg:w-200 bg-white border shadow-lg rounded-xl p-4 z-50">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categoriesData.map((cat) => (
              <Link
                href={`/products?category=${encodeURIComponent(cat.title)}`}
                key={cat.id}
                className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                onClick={() => setOpen(false)}
              >
                <div className="w-14 h-14 relative">
                  <Image
                    src={cat.image_Url}
                    alt={cat.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-xs mt-2 text-gray-700 line-clamp-2">
                  {cat.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
