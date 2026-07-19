"use client";
import LoadingDots from "@/components/Common/LoadingDots";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useState } from "react";
import { FiX } from "react-icons/fi";

export default function WithdrawMoney() {
  const [open, setOpen] = useState(false);
  useBodyScrollLock(open);

  const { orders, error, loading } = useAppSelector((state) => state.order);

  const totalEarnings =
    orders &&
    orders
      .filter((o) => o.status === "Delivered")
      .reduce((acc, o) => o.totalPrice + acc, 0);

  const availableBalance = (totalEarnings - totalEarnings * 0.1).toFixed(2);

  if (loading || (!error && !orders))
    return <LoadingDots text="Loading Balance" />;

  return (
    <>
      <div className="flex flex-col min-h-85">
        <h1 className="text-3xl font-bold text-blue-600">Withdraw Money</h1>
        <p className="mt-2 mb-8 text-gray-500">
          Request a withdrawal and keep track of your payouts with ease.
        </p>

        <div className="flex-1 flex flex-col items-center justify-center space-y-2">
          <h2>Available Balance {availableBalance}</h2>
          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer h-10 w-40 bg-black text-white font-bold text-lg rounded-sm"
          >
            Withdraw
          </button>
        </div>
      </div>

      {open && <AddWithdrawalMethodModal setOpen={setOpen} />}
    </>
  );
}

function AddWithdrawalMethodModal({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const values = {
      bankName: form.get("bankName"),
      bankCountry: form.get("bankCountry"),
      swiftCode: form.get("swiftCode"),
      accountNumber: form.get("accountNumber"),
      accountHolderName: form.get("accountHolderName"),
      bankAddress: form.get("bankAddress"),
    };

    console.log(values);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black transition";

  const Label = ({
    htmlFor,
    children,
  }: {
    htmlFor: string;
    children: React.ReactNode;
  }) => (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      {children} <span className="text-red-500">*</span>
    </label>
  );

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
        >
          <FiX size={22} />
        </button>

        <h2 className="mb-6 text-2xl font-semibold">
          Add New Withdrawal Method
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="bankCountry">Bank Country</Label>
              <input
                id="bankCountry"
                name="bankCountry"
                type="text"
                required
                className={inputClass}
              />
            </div>

            <div>
              <Label htmlFor="swiftCode">Bank SWIFT Code</Label>
              <input
                id="swiftCode"
                name="swiftCode"
                type="text"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="accountNumber">Bank Account Number</Label>
              <input
                id="accountNumber"
                name="accountNumber"
                type="text"
                required
                className={inputClass}
              />
            </div>

            <div>
              <Label htmlFor="accountHolderName">Bank Holder Name</Label>
              <input
                id="accountHolderName"
                name="accountHolderName"
                type="text"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bankAddress">Bank Address</Label>
            <textarea
              id="bankAddress"
              name="bankAddress"
              rows={4}
              required
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex justify-start pt-2">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-900"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
