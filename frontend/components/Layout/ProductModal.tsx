"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart, FiMessageCircle, FiShoppingCart, FiX } from "react-icons/fi";
import { Product } from "@/redux/slices/product";
import { addToCart } from "@/redux/slices/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addToWishlist, removeFromWishlist } from "@/redux/slices/wishlist";

export default function ProductModal({
  product,
  setOpen,
}: {
  product: Product;
  setOpen: (fvrt: boolean) => void;
}) {
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const dispatch = useAppDispatch();
  const [isFavourite, setIsFavourite] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const doesExist = wishlist?.find((item) => item?._id == product?._id);
    if (doesExist) {
      setIsFavourite(true);
    }
  }, [wishlist]);

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl rounded-xl overflow-hidden flex flex-col md:flex-row"
      >
        <div className="w-full md:w-1/2 p-6 border-r">
          <div className="w-full h-72 relative rounded-lg overflow-hidden">
            <Image
              src={`http://localhost:8000/uploads/${product?.images?.[0]}`}
              alt={product.name}
              fill
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="overflow-hidden h-14 w-14 rounded-full">
              <Image
                className="object-cover object-left w-full h-full"
                src={`http://localhost:8000/uploads/${product?.shop?.avatar}`}
                alt="shop"
                height={60}
                width={60}
                unoptimized
              />
            </div>

            <div>
              <p className="text-sm font-semibold">{product?.shop?.name}</p>

              {/* <div className="flex items-center gap-1 text-xs text-gray-500">
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
              </div> */}
            </div>
          </div>

          <button className="mt-4 cursor-pointer max-w-3xl text-sm bg-black text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition">
            <FiMessageCircle /> Message Shop
          </button>

          <p className="mt-2 text-xs text-gray-500">{product.sold_out} sold</p>
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
              ${product.discountPrice || product.originalPrice}
            </span>

            {product.discountPrice && (
              <span className="text-red-500 line-through text-sm">
                ${product.originalPrice}
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
                onClick={() =>
                  setQty((q) => {
                    if (q < product?.stock) return q + 1;
                    return q;
                  })
                }
                className="cursor-pointer px-3 py-2 bg-gray-100"
              >
                +
              </button>
            </div>

            {isFavourite ? (
              <AiFillHeart
                onClick={() => {
                  // setIsFavourite(false);
                  dispatch(removeFromWishlist(product?._id));
                }}
                className="text-red-600 cursor-pointer text-xl"
                title="Remove from favourites"
              />
            ) : (
              <FiHeart
                onClick={() => {
                  // setIsFavourite(true);
                  dispatch(addToWishlist(product));
                }}
                className="cursor-pointer hover:text-red-500 text-xl"
                title="Add to favourites"
              />
            )}
          </div>

          <button
            onClick={() =>
              dispatch(addToCart({ _id: product?._id, quantity: qty }))
            }
            className="cursor-pointer mt-6 w-full bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
