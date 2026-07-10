"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/axios/api";
import Link from "next/link";

export default function Verify() {
  const searchParams = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const sellerToken = searchParams.get("seller_token");

  const [status, setStatus] = useState("loading");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        if (token) {
          await api.post("/auth/verify", { uid, token });
        } else if (sellerToken) {
          await api.post("/shop/verify", { uid, seller_token: sellerToken });
        }
        setStatus("success");
      } catch (err) {
        setStatus("failed");
      }
    };

    verify();
  }, []);

  const resend = async () => {
    if (token) {
      await api.post("/auth/resend-verification", { email, uid });
    } else if (sellerToken) {
      await api.post("/shop/resend-verification", { email, uid });
    }
    setStatus("resent");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 text-center">
        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-blue-600">
          Email Verification
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we verify your account
        </p>

        {status === "loading" && (
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute w-20 h-20 rounded-full bg-blue-100 animate-ping opacity-75"></div>

              <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl shadow-md animate-bounce">
                ✉️
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-700 font-medium">Verifying your email</p>
              <p className="text-sm text-gray-500 mt-1 animate-pulse">
                Please wait a moment...
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-100">
              <span className="text-green-600 text-2xl">✓</span>
            </div>
            <p className="text-gray-700 font-medium">
              Your email has been verified successfully
            </p>

            <Link
              href={token ? "/login" : "seller_login"}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "failed" && (
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
                <span className="text-red-600 text-2xl">!</span>
              </div>
              <p className="text-gray-700 font-medium">
                Verification failed or expired
              </p>
              <p className="text-sm text-gray-500">
                Enter your email to receive a new verification link
              </p>
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={resend}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
            >
              Resend Verification
            </button>
          </div>
        )}

        {status === "resent" && (
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
              <span className="text-blue-600 text-xl">📧</span>
            </div>
            <p className="text-gray-700 font-medium">
              Verification email sent again
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
