"use client";
import api from "@/axios/api";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import Loader from "@/components/Layout/Loader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { getWithdrawRequests } from "@/redux/actions/withdraw";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addShop } from "@/redux/slices/shop";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

export default function WithdrawMoney() {
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [addMethodModalOpen, setAddMethodModalOpen] = useState(false);
  const { shop } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();
  const [createLoading, setCreateLoading] = useState(false);
  const { withdrawRequests, loading, error } = useAppSelector(
    (state) => state.withdraw,
  );
  useBodyScrollLock(withdrawModalOpen);
  useBodyScrollLock(addMethodModalOpen);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Withdraw Request ID",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        const status = params.value;

        const colorMap: Record<
          string,
          "success" | "warning" | "error" | "info"
        > = {
          Success: "success",
          "Refund Success": "success",
          Processing: "warning",
        };

        return <Chip label={status} color={colorMap[status]} size="small" />;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 150,
    },
  ];

  const rows = withdrawRequests
    ? withdrawRequests?.map((w) => ({
        id: w?._id,
        status: w?.status,
        amount: w?.amount,
      }))
    : [];

  if (loading.get || (!error && !withdrawRequests)) return <Loader />;

  return (
    <>
      <div className="flex mb-6 flex-col justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">Withdraw Money</h1>

            <p className="mt-2 text-gray-500">
              Request a withdrawal and keep track of your payouts with ease.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2">
            {" "}
            <h2>
              Available Balance{": "}
              <span className="font-bold">USD {shop?.availableBalance}</span>
            </h2>{" "}
            <button
              onClick={() =>
                shop?.availableBalance > 50
                  ? setWithdrawModalOpen(true)
                  : toast.error("Insufficient balance")
              }
              className="cursor-pointer h-10 w-40 bg-black text-white font-bold text-lg rounded-sm"
            >
              {" "}
              Withdraw{" "}
            </button>{" "}
          </div>
        </div>
      </div>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <WithdrawModal
        loading={createLoading}
        open={withdrawModalOpen}
        availableBalance={shop?.availableBalance}
        methods={shop?.withdrawMethods}
        onClose={() => setWithdrawModalOpen(false)}
        onOpenAddMethod={() => {
          setWithdrawModalOpen(false);
          setAddMethodModalOpen(true);
        }}
        onDeleteMethod={async (id) => {
          try {
            const res = await api.delete(`/shop/withdraw/${id}`);
            toast.success("Withdraw Method Deleted successfully");
            dispatch(addShop(res.data?.shop));
          } catch (error) {
            toast.error(error?.response?.data?.message);
          }
        }}
        onWithdraw={async (methodId, amount) => {
          try {
            setCreateLoading(true);
            const res = await api.post("/withdraw", {
              amount,
              paymentMethodId: methodId,
            });
            toast.success("Withdraw Request made successfully");
            dispatch(addShop(res.data?.seller));
            dispatch(getWithdrawRequests());
          } catch (error) {
            toast.error(error?.response?.data?.message);
          } finally {
            setWithdrawModalOpen(false);
            setCreateLoading(false);
          }
        }}
      />

      <AddWithdrawalMethodModal
        loading={createLoading}
        open={addMethodModalOpen}
        onBack={() => {
          setAddMethodModalOpen(false);
          setWithdrawModalOpen(true);
        }}
        onSubmit={async (values) => {
          try {
            setCreateLoading(true);
            const res = await api.post("/shop/withdraw", values);
            dispatch(addShop(res.data?.shop));
            toast.success("Withdraw Method created successfully");
          } catch (error) {
            toast.error(error?.response?.data?.message);
          } finally {
            setAddMethodModalOpen(false);
            setWithdrawModalOpen(true);
            setCreateLoading(false);
          }
        }}
      />
    </>
  );
}

function WithdrawModal({
  open,
  availableBalance,
  methods,
  onClose,
  onOpenAddMethod,
  onDeleteMethod,
  onWithdraw,
  loading,
}) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(
    methods?.length ? methods[0]._id : null,
  );

  const [amount, setAmount] = useState("");

  if (!open) return null;

  const submitWithdraw = () => {
    if (!selectedMethod) {
      toast.error("Please select a Withdrawal method to proceed");
      return;
    }

    const value = Number(amount);

    if (!value || value <= 0) return;
    if (value > availableBalance) {
      toast.error("Insufficient available balance.");
      return;
    }

    onWithdraw(selectedMethod, value);
  };

  const maskAccount = (number: string) => {
    if (number.length <= 4) return number;

    return `${"*".repeat(number?.length - 4)}${number.slice(-4)}`;
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 transition hover:text-black"
        >
          <FiX size={22} />
        </button>

        <div className="border-b p-6">
          <h2 className="text-2xl font-semibold">Withdraw Funds</h2>

          <p className="mt-2 text-gray-500">
            Available Balance
            <span className="ml-2 font-semibold text-black">
              ${availableBalance}
            </span>
          </p>
        </div>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto p-6">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Withdrawal Methods</h3>

              <button
                onClick={() => {
                  onClose();
                  onOpenAddMethod();
                }}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
              >
                <FiPlus />
                Add New
              </button>
            </div>

            {methods?.length ? (
              <div className="space-y-4">
                {methods.map((method) => {
                  const selected = selectedMethod === method._id;

                  return (
                    <div
                      key={method._id}
                      onClick={() => setSelectedMethod(method._id)}
                      className={`cursor-pointer rounded-xl border p-4 transition ${
                        selected
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold">{method.bankName}</h4>

                          <p className="mt-1 text-sm text-gray-600">
                            {method.accountHolderName}
                          </p>

                          <p className="text-sm text-gray-500">
                            {maskAccount(method.accountNumber)}
                          </p>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteMethod(method._id);
                          }}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
                <h4 className="text-lg font-semibold">No Withdrawal Methods</h4>

                <p className="mt-2 text-sm text-gray-500">
                  Add a withdrawal method before requesting a payout.
                </p>
              </div>
            )}
          </div>

          {methods?.length > 0 && (
            <>
              <div>
                <label className="mb-2 block font-medium">
                  Withdrawal Amount
                </label>

                <input
                  type="number"
                  min={1}
                  max={Number(availableBalance)}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
              </div>

              <div className="flex justify-end gap-3 border-t pt-5">
                <button
                  onClick={onClose}
                  className="cursor-pointer rounded-lg border px-5 py-2 font-medium"
                >
                  Close
                </button>

                <button
                  onClick={submitWithdraw}
                  className="cursor-pointer rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-900"
                >
                  {loading ? <ButtonLoader /> : "Withdraw"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function AddWithdrawalMethodModal({ open, onBack, onSubmit, loading }) {
  if (!open) return null;

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black";

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

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    onSubmit({
      bankName: form.get("bankName") as string,
      bankCountry: form.get("bankCountry") as string,
      swiftCode: form.get("swiftCode") as string,
      accountNumber: form.get("accountNumber") as string,
      accountHolderName: form.get("accountHolderName") as string,
      bankAddress: form.get("bankAddress") as string,
    });
  };

  return (
    <div
      onClick={onBack}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl"
      >
        <button
          onClick={onBack}
          className="absolute right-5 top-5 text-gray-500 transition hover:text-black"
        >
          <FiX size={22} />
        </button>

        <div className="border-b p-6">
          <h2 className="text-2xl font-semibold">Add Withdrawal Method</h2>

          <p className="mt-2 text-sm text-gray-500">
            Add a bank account that will receive your withdrawals.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] space-y-5 overflow-y-auto p-6"
        >
          <div>
            <Label htmlFor="bankName">Bank Name</Label>

            <input
              id="bankName"
              name="bankName"
              required
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="bankCountry">Bank Country</Label>

              <input
                id="bankCountry"
                name="bankCountry"
                required
                className={inputClass}
              />
            </div>

            <div>
              <Label htmlFor="swiftCode">SWIFT Code</Label>

              <input
                id="swiftCode"
                name="swiftCode"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="accountNumber">Account Number</Label>

              <input
                id="accountNumber"
                name="accountNumber"
                required
                className={inputClass}
              />
            </div>

            <div>
              <Label htmlFor="accountHolderName">Account Holder</Label>

              <input
                id="accountHolderName"
                name="accountHolderName"
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

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onBack}
              className="cursor-pointer rounded-lg border px-5 py-2 font-medium"
            >
              Back
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-black px-6 py-2 font-medium text-white transition hover:bg-gray-900"
            >
              {loading ? <ButtonLoader /> : "Add Method"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
