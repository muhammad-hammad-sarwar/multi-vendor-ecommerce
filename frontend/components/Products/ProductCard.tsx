"use client";

import { useState } from "react";
import Image from "next/image";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import ProductModal from "../Layout/ProductModal";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { Product } from "@/redux/slices/product";
import { addToCart } from "@/redux/slices/cart";
import { useAppDispatch } from "@/redux/hooks/hooks";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const dispatch = useAppDispatch();
  useBodyScrollLock(open);

  return (
    <>
      <div className="relative">
        <Link href={`/products/${product._id}`}>
          <div className="h-88 bg-white border rounded-xl p-4 hover:shadow-md transition flex flex-col gap-3">
            <div className="relative w-full h-40">
              <img
                src={`http://localhost:8000/uploads/${product?.images?.[0]}`}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-xs text-blue-600">{product?.shop?.name}</p>

              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                {product.name}
              </h3>

              {/* <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-xs ${
                      i < Math.floor(product.)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.rating})
                </span>
              </div> */}

              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-gray-900">
                  ${product.discountPrice || product.originalPrice}
                </span>

                {product.discountPrice && (
                  <span className="text-sm text-red-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <div className="flex justify-end">
                <span className="text-xs text-gray-500">
                  {product.sold_out} sold
                </span>
              </div>
            </div>
          </div>
        </Link>

        <div className="absolute top-3 right-3 flex flex-col items-center gap-3 text-gray-500">
          {isFavourite ? (
            <AiFillHeart
              onClick={() => setIsFavourite(false)}
              className="text-red-600 cursor-pointer transition"
              title="Remove from favourites"
            />
          ) : (
            <FiHeart
              onClick={() => setIsFavourite(true)}
              className="cursor-pointer hover:text-red-500 transition"
              title="Add to favourites"
            />
          )}
          <FiShoppingCart
            onClick={() => dispatch(addToCart({ ...product }))}
            title="Add to cart"
            className="cursor-pointer hover:text-blue-600 transition"
          />
          <FiEye
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-900 transition"
            title="View product"
          />
        </div>
      </div>

      {open && <ProductModal product={product} setOpen={setOpen} />}
    </>
  );
}
