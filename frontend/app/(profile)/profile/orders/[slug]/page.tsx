"use client";
import api from "@/axios/api";
import LoadingDots from "@/components/Common/LoadingDots";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { getAllOrders } from "@/redux/actions/order";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function OrderDetailsPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const { user, loading: userLoading } = useAppSelector((state) => state.user);
  const [selectedItem, setSelectedItem] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  useBodyScrollLock(selectedItem);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const data = orders?.find(
    (o) => o?.user?._id == user?._id && o?._id == params?.slug,
  );

  if ((loading && userLoading) || (!error && !data))
    return <LoadingDots text="Loading Order Details..." />;

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-start gap-3 pb-5">
        <div className="text-3xl flex items-center justify-center">🛍️</div>

        <div className="flex-1 flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order Details
          </h1>
        </div>
      </div>

      <div className="flex justify-between pb-5">
        <p className="text-sm text-gray-500 mt-1">Order ID: {data?._id}</p>

        <p className="text-sm text-gray-500">
          Placed on{" "}
          {new Date(data?.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {data?.cart.map((item) => (
          <div
            key={item?._id}
            className="flex justify-between items-center border rounded-lg p-4"
          >
            <div className="flex gap-4">
              <img
                src={`http://localhost:8000/uploads/${item?.images[0]}`}
                alt={item?.name}
                className="w-20 h-20 rounded-lg object-cover border"
              />

              <div>
                <h2 className="text-gray-900 font-medium">{item?.name}</h2>

                <p className="text-sm text-gray-500 mt-2">
                  ${item?.discountPrice || item?.originalPrice} X{" "}
                  {item?.quantity} = $
                  {(item?.discountPrice || item?.originalPrice) *
                    item?.quantity}
                </p>
              </div>
            </div>

            {data?.status === "Delivered" && !item?.isReviewed && (
              <button
                onClick={() => setSelectedItem(item)}
                className="cursor-pointer mt-4 w-40 h-10 bg-black text-white text-lg font-bold rounded-md"
              >
                Write a Review
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center gap-3 border-b pb-4">
              <img
                src={`http://localhost:8000/uploads/${selectedItem.images[0]}`}
                alt={selectedItem.name}
                className="h-14 w-14 rounded-lg object-cover"
              />

              <div>
                <h2 className="font-semibold text-lg">Write a Review</h2>
                <p className="text-sm text-gray-500">{selectedItem.name}</p>
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium mb-2">Rating</label>

              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full rounded-md border p-2"
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Review</label>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience..."
                className="w-full rounded-md border p-3 resize-none focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setSelectedItem(null);
                  setComment("");
                  setRating(5);
                }}
                className="rounded-md border px-4 py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={async (e) => {
                  await api
                    .post("/products/review", {
                      comment,
                      rating,
                      productId: selectedItem?._id,
                      orderId: params.slug,
                    })
                    .then(() => {
                      toast.success("Review updated successfully");
                      dispatch(getAllOrders());
                    })
                    .catch((err) => toast.error(err?.response?.data?.message));

                  setSelectedItem(null);
                }}
                className="cursor-pointer rounded-md bg-black px-5 py-2 text-white hover:bg-gray-800"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-right mt-2">
        Total Price:
        <span className="text-lg font-bold text-gray-900">
          ${data?.totalPrice}
        </span>
      </div>

      {/* Shipping */}
      <div className="rounded-lg bg-gray-50 p-4 text-gray-600 border-t pt-6 mt-8 flex justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>

          <div className="space-y-1">
            <p>{data?.shippingInfo.address1}</p>
            <p>{data?.shippingInfo.address2}</p>
            <p>
              {data?.shippingInfo?.city}, {data?.shippingInfo?.country}
            </p>
            <p>{data?.shippingInfo?.zipCode}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Payment Info</h2>
          <p>Status: {data?.paymentInfo?.status || "Not Paid"}</p>
        </div>
      </div>

      <Link href={"/"}>
        <button className="cursor-pointer mt-4 w-40 h-10 bg-black text-white text-lg font-bold rounded-md">
          Send Message
        </button>
      </Link>
    </div>
  );
}
