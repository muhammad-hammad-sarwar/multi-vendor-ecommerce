"use client";

import { FiX, FiPlus, FiMinus, FiShoppingCart } from "react-icons/fi";

export default function CartDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/40 z-40"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-100 bg-white z-50 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <FiShoppingCart /> Cart (3)
          </h2>

          <button onClick={() => setOpen(false)}>
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-3 border rounded-lg p-3 relative"
            >
              {/* Remove */}
              <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                <FiX />
              </button>

              {/* Qty Controls */}
              <div className="flex flex-col items-center justify-between">
                <button className="bg-red-500 text-white p-1 rounded">
                  <FiPlus />
                </button>

                <span className="text-sm font-medium">1</span>

                <button className="bg-gray-200 p-1 rounded">
                  <FiMinus />
                </button>
              </div>

              {/* Image */}
              <img
                src="https://via.placeholder.com/80"
                className="w-20 h-20 object-cover rounded"
              />

              {/* Info */}
              <div className="flex flex-col justify-between flex-1">
                <p className="text-sm font-medium line-clamp-2">
                  Product Title Goes Here
                </p>

                <div>
                  <p className="text-sm">$120</p>
                  <p className="text-sm text-red-500 font-semibold">
                    $120 total
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout */}
        <div className="p-4 border-t">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition">
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
}
