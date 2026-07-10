"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  decrementCartItem,
  incrementCartItem,
  removeFromCart,
} from "@/redux/slices/cart";
import clsx from "clsx";
import { FiX, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

export default function CartDrawer({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { cartItems } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce((sum, item) => {
    return sum + (item?.discountPrice || item?.originalPrice) * item?.quantity;
  }, 0);

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-40"
      />

      <div
        className={
          "fixed right-0 top-0 h-full w-full sm:w-100 bg-white z-50 shadow-lg flex flex-col"
        }
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FiShoppingCart /> Cart ({cartItems?.length})
          </h2>

          <button onClick={() => setOpen(false)}>
            <FiX className="cursor-pointer text-xl" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems?.length == 0 ? (
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-sm text-gray-500">No cart items yet.</p>
            </div>
          ) : (
            cartItems?.map((item) => (
              <div
                key={item?._id}
                className="flex gap-3 border rounded-lg p-3 relative"
              >
                <button className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-red-500">
                  <FiX onClick={() => dispatch(removeFromCart(item?._id))} />
                </button>

                <div className="flex flex-col items-center justify-between">
                  <button
                    onClick={() => dispatch(incrementCartItem(item))}
                    className="cursor-pointer bg-red-500 text-white p-1 rounded"
                  >
                    <FiPlus />
                  </button>

                  <span className="text-sm font-medium">{item?.quantity}</span>

                  <button
                    onClick={() => dispatch(decrementCartItem(item?._id))}
                    className="cursor-pointer bg-gray-200 p-1 rounded"
                  >
                    <FiMinus />
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

        <div className="p-4 border-t">
          <button
            disabled={total == 0}
            className="disabled:cursor-not-allowed disabled:text-gray-200 disabled:bg-gray-400 disabled:hover:bg-gray-400 cursor-pointer w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Checkout Now (USD$ {total})
          </button>
        </div>
      </div>
    </>
  );
}
