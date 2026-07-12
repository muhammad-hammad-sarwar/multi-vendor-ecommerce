import { checkCouponCodeValidity } from "@/redux/actions/coupon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";
import ButtonLoader from "../Layout/ButtonLoader/ButtonLoader";
import { toast } from "react-toastify";

export default function OrderSummary({
  totalPrice,
  subTotal,
  shippingCost,
}: {
  totalPrice: number;
  subTotal: number;
  shippingCost: number;
}) {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { loading, totalDiscount } = useAppSelector((state) => state.coupon);
  const [couponCode, setCouponValue] = useState("");
  const dispatch = useAppDispatch();

  const applyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }

    dispatch(checkCouponCodeValidity({ couponCode, cart: cartItems })).then(
      () => setCouponValue(""),
    );
  };

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subTotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${shippingCost}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 text-lg font-bold">
            {totalDiscount ? `$${totalDiscount}` : "____"}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${totalPrice - totalDiscount}</span>
        </div>
      </div>

      <form className="mt-8">
        <label className="block text-sm font-medium mb-2">Coupon Code</label>

        <div className="flex gap-2">
          <input
            value={couponCode}
            onChange={(e) => setCouponValue(e.target.value)}
            type="text"
            placeholder="Enter coupon"
            className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={applyCoupon}
            className="rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700 transition"
          >
            {loading ? <ButtonLoader /> : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
}
