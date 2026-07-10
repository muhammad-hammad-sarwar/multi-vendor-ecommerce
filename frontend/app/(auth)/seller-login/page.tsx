"use client";
import api from "@/axios/api";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await api.post("/shop/login", { email, password });
      toast.success("Logged In successfully");
      router.push(`/shop/${result.data?.shopId}`);
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-blue-600 text-center">
          Login to your seller account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your credentials to continue
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <div className="relative mt-1">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                id="email"
                required={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <div className="relative mt-1">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required={true}
                id="password"
                name="password"
                type={isVisible ? "text" : "password"}
                autoComplete="current-password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setIsVisible((prev) => !prev)}
                aria-label={isVisible ? "Hide password" : "Show password"}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {isVisible ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                id="remember-me"
                aria-label="Remember login session"
                className="cursor-pointer"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              aria-label="Forgot password page"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            aria-label="Login to account"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg font-medium transition"
          >
            {loading ? <ButtonLoader /> : "Login"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/seller-sign-up"
              aria-label="Go to sign up page"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
