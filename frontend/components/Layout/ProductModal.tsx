"use client";

import { useState } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import {
  FiHeart,
  FiMessageCircle,
  FiMessageSquare,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { Product } from "../Products/ProductCard";

export default function ProductModal({
  product,
  setOpen,
}: {
  product: Product;
  setOpen: (fvrt: boolean) => void;
}) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-5xl rounded-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-6 border-r">
          <div className="w-full h-72 relative rounded-lg overflow-hidden">
            <Image
              src={product.image_Url[0].url}
              alt={product.name}
              fill
              // priority
              className="object-contain"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="overflow-hidden h-14 w-14 rounded-full">
              <Image
                className="object-cover object-left w-full h-full"
                src={product.shop.shop_avatar.url}
                alt="shop"
                height={60}
                width={60}
              />
            </div>

            <div>
              <p className="text-sm font-semibold">{product.shop.name}</p>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.floor(product.shop.ratings)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          <button className="mt-4 cursor-pointer max-w-3xl text-sm bg-black text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition">
            <FiMessageCircle /> Message Shop
          </button>

          <p className="mt-2 text-xs text-gray-500">
            {product.total_sell} sold
          </p>
        </div>

        <div className="w-full md:w-1/2 p-6 relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-black"
          >
            <FiX className="cursor-pointer" size={20} />
          </button>

          <h2 className="text-xl font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="text-sm text-gray-500 mt-2 line-clamp-4">
            {product.description}
          </p>

          <div className="mt-4">
            <span className="text-2xl font-bold text-black mr-2">
              ${product.discount_price || product.price}
            </span>

            {product.discount_price && (
              <span className="text-red-500 line-through text-sm">
                ${product.price}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="cursor-pointer px-3 py-2 bg-gray-100"
              >
                -
              </button>

              <span className="px-4">{qty}</span>

              <button
                onClick={() => setQty((q) => q + 1)}
                className="cursor-pointer px-3 py-2 bg-gray-100"
              >
                +
              </button>
            </div>

            {isFavourite ? (
              <AiFillHeart
                onClick={() => setIsFavourite(false)}
                className="text-red-600 cursor-pointer text-xl"
                title="Remove from favourites"
              />
            ) : (
              <FiHeart
                onClick={() => setIsFavourite(true)}
                className="cursor-pointer hover:text-red-500 text-xl"
                title="Add to favourites"
              />
            )}
          </div>

          <button className="cursor-pointer mt-6 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition">
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
