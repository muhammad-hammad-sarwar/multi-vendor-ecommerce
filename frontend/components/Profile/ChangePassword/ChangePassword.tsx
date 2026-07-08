"use client";
import { useState } from "react";
import { FiLock } from "react-icons/fi";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
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

          <div className="mt-1">
            <input
              name="old-password"
              type="password"
              required
              value={oldPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setOldPassword(e.target.value)
              }
              className="pl-5 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="text-sm font-medium text-gray-700"
          >
            Enter Your New Password
          </label>

          <div className="mt-1">
            <input
              type="password"
              name="new-password"
              required
              value={newPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              className="pl-5 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Your New Password
          </label>

          <div className="mt-1">
            <input
              type="password"
              name="confirm-password"
              required
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              className="pl-5 pr-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium cursor-pointer"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
