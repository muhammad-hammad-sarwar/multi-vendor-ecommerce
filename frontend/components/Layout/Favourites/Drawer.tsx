"use client";

import { FiX } from "react-icons/fi";
import { AiFillHeart } from "react-icons/ai";

export function FavouritesDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  if (!open) return null;

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
            Favourites (2)
          </h2>

          <button onClick={() => setOpen(false)}>
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-sm text-gray-500">No favourite items yet.</p>
        </div>
      </div>
    </>
  );
}
