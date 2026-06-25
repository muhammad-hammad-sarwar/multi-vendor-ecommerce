"use client";
import { useState } from "react";
import Image from "next/image";
import { FiUser, FiMail, FiPhone, FiMapPin, FiUpload } from "react-icons/fi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { CameraIcon } from "lucide-react";

export default function ProfileDetails() {
  const { user } = useAppSelector((state) => state.user);
  const [name, setName] = useState<string>(user ? user.name : "");
  const [email, setEmail] = useState<string>(user ? user.email : "");
  const [phone, setPhone] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(file);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="relative flex flex-col items-center mb-8">
        <div className="w-28 h-28 rounded-full border-4 border-green-400 p-1 overflow-hidden">
          {avatar || user ? (
            <Image
              src={
                user
                  ? `http://localhost:8000/uploads/${user.avatar}`
                  : URL.createObjectURL(avatar)
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
        <label className="z-100 absolute bottom-0 w-7 h-7 cursor-pointer rounded-full flex items-center justify-center gap-2 bg-gray-300 hover:underline">
          <CameraIcon size={16} />
          <input
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
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <div className="relative mt-1">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
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
          <label className="text-sm font-medium text-gray-700">Email</label>
          <div className="relative mt-1">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative mt-1">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Zip Code</label>
          <div className="relative mt-1">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={zip}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setZip(e.target.value)
              }
              className="w-full pl-10 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            value={address1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress1(e.target.value)
            }
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Address Line 2
          </label>
          <input
            type="text"
            value={address2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress2(e.target.value)
            }
            className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
}
