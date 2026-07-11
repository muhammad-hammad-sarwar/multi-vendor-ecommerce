"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import { useState } from "react";
import { FiCalendar, FiGrid, FiPackage, FiStar } from "react-icons/fi";
import { ProductCard } from "../Products/ProductCard";
type Tab = "products" | "events" | "reviews";

export default function ShopDetailsInfo({ products, isOwner }) {
  const [activeTab, setActiveTab] = useState<Tab>("products");
  return (
    <main className="flex-1">
      <div className="mb-8 flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex gap-2 rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab("products")}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Shop Products
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              activeTab === "events"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Running Events
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`rounded-lg px-5 py-2 font-medium transition ${
              activeTab === "reviews"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            Shop Reviews
          </button>
        </div>

        {isOwner && (
          <Link
            href="/seller/dashboard"
            className="flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
          >
            <FiGrid />
            Dashboard
          </Link>
        )}
      </div>

      {activeTab === "products" && products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((p) => (
            <ProductCard key={p?._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border bg-white py-16 text-center shadow-sm">
          <FiPackage className="mx-auto text-gray-300" size={50} />
          <h2 className="mt-5 text-xl font-semibold">No Products Yet</h2>
          <p className="mt-2 text-gray-500">
            This shop hasn't listed any products yet.
          </p>
        </div>
      )}

      {activeTab === "events" && (
        <div className="rounded-2xl border bg-white py-16 text-center shadow-sm">
          <FiCalendar className="mx-auto text-gray-300" size={50} />
          <h2 className="mt-5 text-xl font-semibold">No Events Yet</h2>
          <p className="mt-2 text-gray-500">
            There are no active promotional events at the moment.
          </p>
        </div>
      )}

      {activeTab === "reviews" && (
        <section className="space-y-6">
          <div className="rounded-2xl border bg-white py-16 text-center shadow-sm">
            <FiStar className="mx-auto text-gray-300" size={50} />

            <h2 className="mt-5 text-xl font-semibold">No Reviews Yet</h2>

            <p className="mt-2 text-gray-500">
              Your shop hasn't received any reviews yet.
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
