import { useAppSelector } from "@/redux/hooks/hooks";

export default function OrderSummary() {
  const { cartItems } = useAppSelector((state) => state.cart);
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">$320.00</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">$15.00</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600">-$25.00</span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>$310.00</span>
        </div>
      </div>

      <div className="mt-8">
        <label className="block text-sm font-medium mb-2">Coupon Code</label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter coupon"
            className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button className="rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700 transition">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
