"use client";
import LoadingDots from "@/components/Common/LoadingDots";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import {
  updateShopAvatar,
  updateShopProfile,
} from "@/redux/actions/shop.action";
import { updateUserProfileAvatar } from "@/redux/actions/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FiCamera,
  FiHome,
  FiMapPin,
  FiPhone,
  FiFileText,
  FiUser,
  FiLock,
} from "react-icons/fi";

export default function SellerSettings() {
  const {
    shop,
    loading: shopLoading,
    profileUpdateLoading,
    error,
  } = useAppSelector((state) => state.shop);
  const [avatar, setAvatar] = useState<File | null>(null);
  const [shopName, setShopName] = useState(shop?.name ?? "");
  const [address, setAddress] = useState(shop?.address ?? "");
  const [phone, setPhone] = useState(shop?.phoneNumber ?? "");
  const [zipCode, setZipCode] = useState(shop?.zipCode ?? "");
  const [description, setDescription] = useState(shop?.description || "");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
    const formData = new FormData();
    formData.append("avatar", file);

    dispatch(updateShopAvatar(formData)).then(() => {
      setAvatar(file);
    });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateShopProfile({
        name: shopName,
        password,
        phoneNumber: phone,
        zipCode,
        address,
        description,
      }),
    );
  };

  useEffect(() => {
    if (!shop) return;

    setShopName(shop.name);
    setDescription(shop.description);
    setAddress(shop.address);
    setPhone(shop.phoneNumber);
    setZipCode(shop.zipCode);
  }, [shop]);

  if (shopLoading || (!error && !shop))
    return <LoadingDots text="Loading shop info" />;

  return (
    <div className="mx-auto">
      <h1 className="text-blue-600 text-3xl font-bold">Shop Settings</h1>

      <p className="text-gray-500 mt-1">
        Update your seller profile information.
      </p>

      <div className="flex justify-center mt-10">
        <div className="relative">
          <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
            {avatar || shop?.avatar ? (
              <Image
                src={
                  avatar
                    ? URL.createObjectURL(avatar)
                    : `http://localhost:8000/uploads/${shop?.avatar}`
                }
                alt="Shop Avatar"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
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
              onChange={handleImageChange}
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
              type={"password"}
              placeholder="Enter Password for Updaing Shop details"
              autoComplete="current-password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            disabled={profileUpdateLoading}
            className={`cursor-pointer min-w-44 rounded-lg border-2 border-blue-600 px-6 h-12 font-medium transition-all duration-200
                ${
                  profileUpdateLoading
                    ? "cursor-not-allowed bg-blue-600 text-white"
                    : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
                }`}
          >
            {profileUpdateLoading ? <ButtonLoader /> : "Update Shop"}
          </button>
        </div>
      </form>
    </div>
  );
}
