import { useEffect, useState } from "react";

export default function OrderSummaryPayments() {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
    setOrderData(orderData);
  }, []);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${orderData?.subTotalPrice}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">${orderData?.shippingCost}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="text-green-600 text-lg font-bold">
            {orderData?.discount ? `$${orderData?.discount}` : "____"}
          </span>
        </div>

        <hr />

        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${orderData?.totalPrice - (orderData?.discount || 0)}</span>
        </div>
      </div>
    </div>
  );
}
