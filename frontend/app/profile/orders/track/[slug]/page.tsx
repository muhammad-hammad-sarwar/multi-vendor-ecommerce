"use client";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { getAllOrders } from "@/redux/actions/order";
import LoadingDots from "@/components/Common/LoadingDots";

export const ORDER_STATUS_MESSAGES: Record<string, string> = {
  Processing:
    "Your order is being prepared by the seller. We'll notify you once it has been shipped.",

  "On the way":
    "Your order is on the way and should arrive soon. Keep an eye out for delivery updates.",

  Delivered: "Your order has been delivered. We hope you enjoy your purchase!",

  "Refund Processing":
    "Your refund request has been received and is currently being reviewed by the seller.",

  "Refund Success": "Your refund has been approved and completed successfully.",
};

export const getOrderStatusMessage = (status: string) =>
  ORDER_STATUS_MESSAGES[status] ??
  "Your order status has been updated. Please check again later for more information.";

export default function OrderDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const order = orders?.find((o) => o._id === slug);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!orders) dispatch(getAllOrders());
  }, []);

  if (loading || (!error && !orders))
    return <LoadingDots text="Loading order Details..." />;

  if (!order) {
    return (
      <div className="flex justify-center py-20">
        <p className="text-gray-500">Order not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Order Status</h1>

          <p className="mt-1 text-sm text-gray-500">Order ID: {order?._id}</p>
        </div>

        <span
          className={`rounded-full px-4 py-1.5 text-sm font-medium ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "Refund Success"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Refund Processing"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "On the way"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      <div className="mt-6 rounded-lg bg-gray-50 p-5">
        <p className="text-gray-600 leading-7">
          {getOrderStatusMessage(order?.status)}
        </p>
      </div>
    </div>
  );
}
