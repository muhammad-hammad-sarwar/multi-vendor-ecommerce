"use client";
import api from "@/axios/api";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import OrderSuccessPage from "@/components/Checkout/OrderSuccessPage";
import OrderSummary from "@/components/Checkout/OrderSummary";
import OrderSummaryPayments from "@/components/Checkout/OrderSummaryPayments";
import PaymentPage from "@/components/Checkout/PaymentPage";
import ShippingForm from "@/components/Checkout/ShippingForm";
import LoadingDots from "@/components/Common/LoadingDots";
import Header from "@/components/Layout/Header/Header";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AlertTriangle } from "lucide-react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { user, loading, error } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [orderData, setOrderData] = useState(null);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const res = await api.get("/payment/api-key");
    setStripeApiKey(res.data?.stripeApiKey);
  };

  useEffect(() => {
    getStripeApiKey();
    const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
    setOrderData(orderData);
  }, []);

  const subTotal = cartItems?.reduce(
    (acc, p) => acc + (p?.discountPrice || p?.originalPrice) * p?.quantity,
    0,
  );
  const shippingPrice = 0.1 * subTotal;
  const totalPrice = subTotal + shippingPrice;

  return (
    <>
      <Header />
      <div>
        {loading || (!error && !user) ? (
          <LoadingDots />
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            {(step == 1 || step == 2) && <CheckoutSteps currentStep={step} />}

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                {step == 1 && (
                  <ShippingForm
                    shippingCost={shippingPrice}
                    subTotalPrice={subTotal}
                    totalPrice={totalPrice}
                    setStep={setStep}
                  />
                )}
                {step == 2 && stripeApiKey ? (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <PaymentPage
                      setStep={setStep}
                      amount={totalPrice}
                      fullName={orderData?.fullName}
                    />
                  </Elements>
                ) : (
                  step == 2 && (
                    <div className="flex min-h-[60vh] items-center justify-center px-6">
                      <div className="max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
                          <AlertTriangle className="h-7 w-7 text-yellow-600" />
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                          Payments Unavailable
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          Stripe has not been configured yet. Payments are
                          temporarily unavailable. Please try again later or
                          contact the administrator.
                        </p>

                        <button
                          onClick={() => window.location.reload()}
                          className="mt-6 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                          Refresh
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
              {step == 1 && (
                <OrderSummary
                  shippingCost={shippingPrice}
                  subTotal={subTotal}
                  totalPrice={totalPrice}
                />
              )}
              {step == 2 && <OrderSummaryPayments />}
            </div>
            {step == 3 && <OrderSuccessPage />}
          </div>
        )}
      </div>
    </>
  );
}
