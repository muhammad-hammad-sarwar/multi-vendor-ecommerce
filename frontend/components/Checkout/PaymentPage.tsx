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
import ButtonLoader from "../Layout/ButtonLoader/ButtonLoader";
import { loadAllProducts } from "@/redux/actions/product";

export default function PaymentPage({ fullName: name, amount, setStep }) {
  const paymentMethods = [
    {
      id: "Stripe",
      title: "Credit / Debit Card",
      description: "Pay securely with Stripe",
    },
    {
      id: "COD",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
    },
    {
      id: "Bank",
      title: "Bank Transfer",
      description: "Transfer payment manually",
    },
  ];

  const [paymentType, setPaymentType] = useState("");
  const [fullName, setFullName] = useState(name ?? "");
  const { cartItems } = useAppSelector((state) => state.cart);
  const stripe = useStripe();
  const elements = useElements();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const {
        data: { client_secret },
      } = await api.post("/payment/process", {
        amount: Math.floor(amount),
      });

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await api.post("/orders", {
          cart: cartItems,
          user: orderData?.user,
          shippingInfo: orderData?.shippingInfo,
          totalPrice: orderData?.totalPrice,
          paymentInfo: {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          },
        });

        toast.success("Order placed successfully");
        setStep(3);
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
        localStorage.removeItem("orderData");

        // Reload products after successful order
        dispatch(loadAllProducts());
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCashOnDelivery = async () => {
    await api
      .post("/orders", {
        cart: cartItems,
        user: orderData?.user,
        shippingInfo: orderData?.shippingInfo,
        totalPrice: orderData?.totalPrice,
        paymentInfo: {
          type: "CashOnDelivery",
        },
      })
      .then(() => {
        toast.success("Order placed successfully");
        setStep(3);
        dispatch(clearCart());
        localStorage.removeItem("cartItems");
        localStorage.removeItem("orderData");
      });
  };

  return (
    <div className="space-y-4">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className="overflow-hidden rounded-xl border bg-white"
        >
          <button
            type="button"
            onClick={() => setPaymentType(method.id)}
            className={`flex w-full items-center justify-between px-5 py-4 text-left transition
          ${
            paymentType === method.id
              ? "bg-blue-50 border-blue-500"
              : "hover:bg-gray-50"
          }`}
          >
            <div>
              <h3 className="font-semibold">{method.title}</h3>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>

            <div
              className={`h-5 w-5 rounded-full border-2 flex items-center justify-center
            ${
              paymentType === method.id ? "border-blue-600" : "border-gray-300"
            }`}
            >
              {paymentType === method.id && (
                <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              )}
            </div>
          </button>

          {/* Content */}
          {paymentType === method.id && (
            <div className="border-t p-6">
              {method.id === "Stripe" && (
                <form
                  onSubmit={stripePaymentHandler}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="text-sm font-medium">Full Name</label>

                    <input
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 w-full rounded-lg border px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Card Number</label>

                    <div className="mt-1 rounded-lg border px-3 py-2">
                      <CardNumberElement options={elementOptions} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Expiry Date</label>

                    <div className="mt-1 rounded-lg border px-3 py-2">
                      <CardExpiryElement options={elementOptions} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">CVC</label>

                    <div className="mt-1 rounded-lg border px-3 py-2">
                      <CardCvcElement options={elementOptions} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer mt-4 h-11 rounded-lg bg-green-600 px-6 text-white"
                  >
                    {loading ? <ButtonLoader /> : `Pay ${amount}`}
                  </button>
                </form>
              )}

              {method.id === "COD" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    You will pay when your order is delivered.
                  </p>

                  <button
                    onClick={handleCashOnDelivery}
                    className="cursor-pointer rounded-lg bg-green-600 px-6 py-3 text-white"
                  >
                    Place Order
                  </button>
                </div>
              )}

              {method.id === "Bank" && (
                <div className="space-y-3">
                  <p className="text-gray-600">
                    Transfer the payment to the following account.
                  </p>

                  <div className="rounded-lg bg-gray-100 p-4">
                    <p>Bank: ABC Bank</p>
                    <p>Account: 123456789</p>
                    <p>IBAN: PK00ABCD123456789</p>
                  </div>

                  <button className="rounded-lg bg-green-600 px-6 py-3 text-white">
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
