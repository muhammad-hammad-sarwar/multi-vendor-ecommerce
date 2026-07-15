"use client";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg border p-10 text-center">
        <div className="relative flex justify-center mb-8">
          <div className="absolute h-24 w-24 rounded-full bg-green-200 animate-ping opacity-30" />

          <div className="relative flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
            <CheckCircle2 className="h-14 w-14 text-green-600 animate-bounce" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Order Successful 🎉
        </h1>

        <p className="mt-4 text-gray-600 leading-7">
          Thank you for your purchase. Your order has been placed successfully
          and is now being processed.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          You will receive an email confirmation shortly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/orders"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
