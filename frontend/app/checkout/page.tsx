"use client";
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

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { user, loading, error } = useAppSelector((state) => state.user);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
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
            <CheckoutSteps currentStep={step} />

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
                {step == 2 && <PaymentPage />}
              </div>
              {step == 1 && (
                <OrderSummary
                  shippingCost={shippingPrice}
                  subTotal={subTotal}
                  totalPrice={totalPrice}
                />
              )}
              {step == 2 && <OrderSummaryPayments orderData={orderData} />}
            </div>
            {step == 3 && <OrderSuccessPage />}
          </div>
        )}
      </div>
    </>
  );
}
