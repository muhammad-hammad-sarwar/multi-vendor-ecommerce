"use client";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import { useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiCamera,
  FiHome,
  FiMapPin,
  FiPhone,
  FiFileText,
  FiUser,
} from "react-icons/fi";

export default function SellerSettings() {
  const {
    isSeller,
    shop,
    loading: isLoading,
    error,
  } = useAppSelector((state) => state.shop);

  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [shopName, setShopName] = useState(shop?.name || "");
  const [address, setAddress] = useState(shop?.address || "");
  const [phone, setPhone] = useState(shop?.phoneNumber || "");
  const [zipCode, setZipCode] = useState(shop?.zipCode || "");
  const [description, setDescription] = useState(shop?.description || "");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }

    formData.append("shopName", shopName);
    formData.append("description", description);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("zipCode", zipCode);

    console.log([...formData.entries()]);
    setLoading(true);
  };

  useEffect(() => {
    if (!shop) return;

    setShopName(shop.name);
    setDescription(shop.description);
    setAddress(shop.address);
    setPhone(shop.phoneNumber);
    setZipCode(shop.zipCode);
  }, [shop]);

  if (isLoading || !shop)
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-3">
            <span className="h-4 w-4 rounded-full bg-orange-400 animate-wave [animation-delay:0ms]" />
            <span className="h-4 w-4 rounded-full bg-orange-500 animate-wave [animation-delay:150ms]" />
            <span className="h-4 w-4 rounded-full bg-red-500 animate-wave [animation-delay:300ms]" />
          </div>

          <p className="text-sm font-medium text-gray-500">
            Loading shop settings...
          </p>
        </div>
      </div>
    );

  return (
    <div className="mx-auto">
      <h1 className="text-blue-600 text-3xl font-bold">Shop Settings</h1>

      <p className="text-gray-500 mt-1">
        Update your seller profile information.
      </p>

      <div className="flex justify-center mt-10">
        <div className="relative">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
            {shop?.avatar ? (
              <Image
                src={`http://localhost:8000/uploads/${shop?.avatar}`}
                alt="Shop Avatar"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : avatar ? (
              <Image
                src={URL.createObjectURL(avatar)}
                alt="Shop Avatar"
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                {/* Show User Image */}
                <FiUser size={70} className="text-gray-400" />
              </div>
            )}
          </div>

          <label className="cursor-pointer absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 shadow-md transition hover:bg-gray-300">
            <FiCamera className="text-xl text-gray-700" />
            <input
              hidden
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImage}
            />
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <div>
          <label htmlFor="shopName" className="font-medium text-gray-700">
            Shop Name
            <span className="text-red-500"> *</span>
          </label>

          <div className="relative mt-1">
            <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="shopName"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="font-medium text-gray-700">
            Shop Description
            <span className="text-red-500"> *</span>
          </label>

          <div className="relative mt-1">
            <FiFileText className="absolute left-3 top-3 text-gray-400" />

            <textarea
              required
              id="description"
              placeholder="Enter Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 pt-2 pl-9 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="font-medium text-gray-700">
            Shop Address
            <span className="text-red-500"> *</span>
          </label>

          <div className="relative mt-1">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              required
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="font-medium text-gray-700">
              Shop Phone Number
              <span className="text-red-500"> *</span>
            </label>

            <div className="relative mt-1">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                required
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="zipCode" className="font-medium text-gray-700">
              Shop Zip Code
              <span className="text-red-500"> *</span>
            </label>

            <input
              required
              type="number"
              inputMode="numeric" // this changes the keyboard on mobile
              id="zipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="mt-1 w-full rounded-lg border bg-gray-50 py-2 px-3 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`cursor-pointer min-w-44 rounded-lg border-2 border-blue-600 px-6 h-12 font-medium transition-all duration-200
                ${
                  loading
                    ? "cursor-not-allowed bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
          >
            {loading ? <ButtonLoader /> : "Update Shop"}
          </button>
        </div>
      </form>
    </div>
  );
}
