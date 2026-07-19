"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUpload,
  FiLock,
} from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { CameraIcon } from "lucide-react";
import LoadingDots from "@/components/Common/LoadingDots";
import {
  updateUserProfile,
  updateUserProfileAvatar,
} from "@/redux/actions/user";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";

export default function ProfileDetails() {
  const { user, loading, error, profileLoading } = useAppSelector(
    (state) => state.user,
  );
  const [name, setName] = useState<string>(user ? user.name : "");
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [phone, setPhone] = useState<string>(user ? user?.phoneNumber : "");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // setAvatar(file);
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(updateUserProfileAvatar(formData)).then(() => {
      setAvatar(file);
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, password, phoneNumber: phone }));
  };

  useEffect(() => {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPhone(user?.phoneNumber ?? "");
  }, [user]);

  if (loading || (!error && !user))
    return <LoadingDots text="Loading profile data..." />;

  return (
    <div className="w-full max-w-4xl">
      <div className="max-w-28 mx-auto relative flex flex-col items-center mb-8">
        <div className="w-28 h-28 rounded-full border-4 border-green-400 p-1 overflow-hidden">
          {avatar || user ? (
            <Image
              src={
                avatar
                  ? URL.createObjectURL(avatar)
                  : `http://localhost:8000/uploads/${user.avatar}`
              }
              alt="avatar"
              width={112}
              height={112}
              className="object-cover w-full h-full rounded-full"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-full">
              <FiUser className="text-gray-500 text-2xl" />
            </div>
          )}
        </div>
        <label className="absolute bottom-0 right-1/6 w-7 h-7 cursor-pointer rounded-full flex items-center justify-center gap-2 bg-gray-300 hover:underline">
          <CameraIcon size={16} />
          <input
            hidden
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full name
          </label>
          <div className="relative mt-1">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoComplete="name"
              id="name"
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="cursor-not-allowed relative mt-1">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              disabled
              autoComplete="email"
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border bg-gray-100 py-2 pl-10 pr-3 text-gray-500 opacity-70 cursor-not-allowed focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone-number"
            className="text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="relative mt-1">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoComplete="tel"
              required
              id="phone-number"
              type="tel"
              value={phone}
              placeholder="+92-300-0000000"
              minLength={15}
              maxLength={15}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
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
              placeholder="Enter Password"
              autoComplete="current-password"
              aria-label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="cursor-pointer w-full md:w-42 bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-lg font-medium transition"
          >
            {profileLoading ? <ButtonLoader /> : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}
