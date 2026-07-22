"use client";
import api from "@/axios/api";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const { isSeller } = useAppSelector((state) => state.shop);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || isSeller) return;
    const formData = new FormData();
    if (avatar) formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("name", fullName);

    try {
      setLoading(true);
      setEmail("");
      setPassword("");
      setAvatar(null);
      setFullName("");
      await api.post("/auth/sign-up", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(
        "Registered successfully. Please check mail for link to verify your account",
      );
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-semibold text-blue-600 text-center">
          Create account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </label>

            <div className="relative mt-1">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                aria-label="Full name"
              />
            </div>
          </div>

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
                required
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                aria-label="Email address"
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
                required
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                aria-label="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                {avatar ? (
                  <Image
                    width={56}
                    height={56}
                    src={URL.createObjectURL(avatar)}
                    alt="avatar preview"
                    className="object-cover"
                  />
                ) : (
                  <FiUser className="text-gray-500 text-xl" />
                )}
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Profile picture
                </p>
                <p className="text-xs text-gray-500">JPG, PNG supported</p>
              </div>
            </div>

            <label className="cursor-pointer flex items-center gap-3">
              <input
                required={true}
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="flex items-center gap-2 text-blue-600 hover:underline rounded-lg">
                <FiUpload /> Upload
              </div>
            </label>
          </div>

          <button
            type="submit"
            aria-label="Create account"
            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-lg font-medium transition"
          >
            {loading ? <ButtonLoader /> : "Sign up"}
          </button>

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
