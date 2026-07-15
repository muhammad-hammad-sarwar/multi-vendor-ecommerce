import api from "@/axios/api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { clearCart } from "@/redux/slices/cart";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function PaymentPage({ fullName: name, amount, setStep }) {
  const [fullName, setFullName] = useState(name ?? "");
  const { cartItems } = useAppSelector((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const [orderData, setOrderData] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
    setOrderData(orderData);
  }, []);

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#111827",
        fontFamily: "inherit",
        "::placeholder": {
          color: "#9CA3AF",
        },
      },
      invalid: {
        color: "#EF4444",
      },
    },
  };

  const stripePaymentHandler = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const {
      data: { client_secret },
    } = await api.post("/payment/process", { amount });

    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
      },
    });

    if (result.error) {
      toast.error(result.error?.message);
    } else {
      if (result.paymentIntent?.status === "succeeded")
        await api
          .post("/orders", {
            cart: cartItems,
            user: orderData?.user,
            shippingInfo: orderData?.shippingInfo,
            totalPrice: orderData?.totalPrice,
            paymentInfo: {
              id: result?.paymentIntent?.id,
              status: result.paymentIntent.status,
              type: "Credit Card",
            },
          })
          .then(() => {
            toast.success("Order placed successfully");
            setStep(3);
            dispatch(clearCart());
            localStorage.removeItem("cartItems");
            localStorage.removeItem("orderData");
          });
    }
  };

  return (
    <form
      onSubmit={stripePaymentHandler}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl shadow-sm border p-8"
    >
      <div>
        <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
          Full name
        </label>

        <input
          required
          id="fullName"
          placeholder={name ?? "John Doe"}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          aria-label="Full name"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Card Number</label>

        <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardNumberElement options={elementOptions} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Expiry Date</label>

        <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardExpiryElement options={elementOptions} />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">CVC</label>

        <div className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <CardCvcElement options={elementOptions} />
        </div>
      </div>
      <button
        type="submit"
        className="focus:border focus:border-gray-200 max-w-40 h-10 rounded-sm cursor-pointer bg-green-600 text-white font-bold text-lg"
      >
        Submit
      </button>
    </form>
  );
}
