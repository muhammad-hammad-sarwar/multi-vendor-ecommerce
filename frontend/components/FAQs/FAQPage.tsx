"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse products, add items to your cart, and proceed to checkout to complete your order.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, bank transfers, and selected digital wallets.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "Yes, you can cancel your order before it is shipped from your account dashboard.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3–7 business days depending on your location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship internationally. Shipping charges may vary by region.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You will receive a tracking link via email once your order is shipped.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 7-day return policy for unused products in original packaging.",
  },
  {
    question: "Are my payments secure?",
    answer:
      "Yes, we use encrypted payment gateways to ensure secure transactions.",
  },
  {
    question: "Can I change my delivery address?",
    answer: "Yes, you can update your address before the order is shipped.",
  },
  {
    question: "How do I contact support?",
    answer: "You can reach us via live chat, email, or our contact page.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Find answers to common questions about our platform
        </p>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="bg-white border rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-800">
                    {faq.question}
                  </span>

                  {isOpen ? (
                    <FiMinus className="text-gray-600" />
                  ) : (
                    <FiPlus className="text-gray-600" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
