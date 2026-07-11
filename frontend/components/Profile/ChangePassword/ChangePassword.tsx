"use client";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import { updateUserProfilePassword } from "@/redux/actions/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const dispatch = useAppDispatch();
  const { profileLoading } = useAppSelector((state) => state.user);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    dispatch(
      updateUserProfilePassword({ oldPassword, newPassword, confirmPassword }),
    );
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-8">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="old-password"
            className="text-sm font-medium text-gray-700"
          >
            Enter Your Old Password
          </label>

          <div className="relative mt-1 w-1/2">
            <input
              name="old-password"
              placeholder="Enter your current password"
              type={showOldPassword ? "text" : "password"}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-5 pr-10 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showOldPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="text-sm font-medium text-gray-700"
          >
            Enter Your New Password
          </label>

          <div className="relative mt-1 w-1/2">
            <input
              placeholder="Enter your new password"
              type={showNewPassword ? "text" : "password"}
              name="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-5 pr-10 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Your New Password
          </label>

          <div className="relative mt-1 w-1/2">
            <input
              placeholder="Enter your new password to confirm"
              type={showConfirmPassword ? "text" : "password"}
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border bg-gray-50 py-2 pl-5 pr-10 focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-42 border-2 hover:bg-blue-600 hover:text-white border-blue-600 text-blue-600 px-6 h-12 rounded-lg font-medium cursor-pointer transition"
        >
          {profileLoading ? <ButtonLoader /> : "Update Password"}
        </button>
      </form>
    </div>
  );
}
