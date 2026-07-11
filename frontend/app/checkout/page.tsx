"use client";
import CheckoutSteps from "@/components/Checkout/CheckoutSteps";
import OrderSuccessPage from "@/components/Checkout/OrderSuccessPage";
import OrderSummary from "@/components/Checkout/OrderSummary";
import ShippingForm from "@/components/Checkout/ShippingForm";
import LoadingDots from "@/components/Common/LoadingDots";
import Header from "@/components/Layout/Header/Header";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { user, loading, error } = useAppSelector((state) => state.user);

  return (
    <>
      <Header />
      <div>
        {loading || (!error && !user) ? (
          <LoadingDots />
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
            <CheckoutSteps currentStep={1} />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* <div className="lg:col-span-2">
              </div> */}
              {step == 1 && <ShippingForm setStep={setStep} />}
              {step == 3 && <OrderSuccessPage />}

              {step != 3 && <OrderSummary />}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
