"use client";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import clsx from "clsx";
import { removeFromWishlist } from "@/redux/slices/wishlist";
import { addToCart } from "@/redux/slices/cart";

export function WishlistDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  if (!open) return null;
  const { wishlist } = useAppSelector((store) => store.wishlist);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div className="fixed right-0 top-0 h-full w-full sm:w-100 bg-white z-50 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <AiFillHeart className="text-red-500" />
            Favourites ({wishlist?.length})
          </h2>

          <button onClick={() => setOpen(false)}>
            <FiX className="cursor-pointer text-xl" />
          </button>
        </div>

        {wishlist?.length == 0 ? (
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-sm text-gray-500">No favourite items yet.</p>
          </div>
        ) : (
          wishlist?.map((item) => (
            <div
              key={item?._id}
              className="flex gap-3 border rounded-lg p-3 relative"
            >
              <div className="absolute top-0 right-2 flex flex-col h-full justify-around">
                <button className="cursor-pointer text-gray-400 hover:text-red-500">
                  <FiX
                    onClick={() => dispatch(removeFromWishlist(item?._id))}
                  />
                </button>

                <button
                  onClick={() => dispatch(addToCart(item))}
                  className="cursor-pointer text-gray-600 hover:text-green-600 transition"
                >
                  <FiShoppingCart />
                </button>
              </div>

              <img
                src={`http://localhost:8000/uploads/${item?.images?.[0]}`}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex flex-col justify-between flex-1">
                <p className="text-sm font-medium line-clamp-2 capitalize">
                  {item?.name}
                </p>

                <div>
                  <p
                    className={clsx(
                      "text-sm",
                      item?.discountPrice ? "line-through" : "",
                    )}
                  >
                    ${item?.originalPrice}
                  </p>
                  <p className="text-sm text-red-500 font-semibold">
                    ${item?.discountPrice}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
