"use client";
import api from "@/axios/api";
import LoadingDots from "@/components/Common/LoadingDots";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import { getAllOrders } from "@/redux/actions/order";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function OrderDetails() {
  const params = useParams();
  const [orderloading, setOrderLoading] = useState(false);
  const [status, setStatus] = useState("On the way");
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const { shop, loading: shopLoading } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  const handleUpdateStatus = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!status) toast.error("Please Update the Status");
    setOrderLoading(true);
    try {
      await api.patch(`/orders/seller/${data?._id}/${status}`).then(() => {
        toast.success("Status updated successfully");
        dispatch(getAllOrders(true));
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const handleRefundStatus = async () => {
    setOrderLoading(true);
    try {
      await api.patch(`/orders/seller/refund/${data?._id}`).then(() => {
        toast.success("Status updated successfully");
        dispatch(getAllOrders(true));
      });
    } catch (error) {
      console.log("Error from refund status", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setOrderLoading(false);
    }
  };

  const data = orders?.find(
    (o) => o?.shop == shop?._id && o?._id == params?.slug,
  );

  if (!loading && !shopLoading && !data)
    return <LoadingDots text="Loading Order Details..." />;

  return (
    <div className="mx-auto bg-white">
      <div className="flex items-start gap-3 pb-5">
        <div className="text-3xl flex items-center justify-center">🛍️</div>

        <div className="flex-1 flex justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Order Details
          </h1>

          <Link
            className="w-30 flex items-center justify-center h-10 rounded-md bg-pink-100 font-bold text-pink-600"
            href={"/seller/orders"}
          >
            Order List
          </Link>
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

      {/* Products */}
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
          </div>
        ))}
      </div>

      {/* Order Summary */}
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

      {data?.status == "Processing" && (
        <form
          onSubmit={handleUpdateStatus}
          className="flex flex-col justify-center gap-3 mt-6"
        >
          <label htmlFor="status" className="1font-bold text-xl text-gray-700">
            Order Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="max-w-40 rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="On the way">On the way</option>
            <option value="Delivered">Delivered</option>
          </select>

          <button
            type="submit"
            className="cursor-pointer w-30 flex items-center justify-center h-10 rounded-md bg-pink-100 font-bold text-pink-600"
          >
            {orderloading ? <ButtonLoader bg="bg-pink-700" /> : "Update Status"}
          </button>
        </form>
      )}

      {data?.status == "Refund Processing" && (
        <button
          onClick={handleRefundStatus}
          type="submit"
          className="mt-4 cursor-pointer w-44 flex items-center justify-center h-12 rounded-md bg-pink-100 font-bold text-pink-600"
        >
          {orderloading ? (
            <ButtonLoader bg="bg-pink-700" />
          ) : (
            "Grant Refund Success"
          )}
        </button>
      )}
    </div>
  );
}
