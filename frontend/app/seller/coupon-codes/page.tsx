"use client";
import api from "@/axios/api";
import LoadingDots from "@/components/Common/LoadingDots";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { deleteCoupon, getCoupons } from "@/redux/actions/coupon";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  FiPlus,
  FiTag,
  FiPercent,
  FiPackage,
  FiCalendar,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";

export default function CouponsPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { products } = useAppSelector((state) => state.products);
  const {
    loading: CouponLoading,
    error,
    coupons,
    deleteLoading,
  } = useAppSelector((state) => state.coupon);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [maxDiscount, setMaxDiscount] = useState("");
  const [couponToDelete, setCouponToDelete] = useState(null);
  const dispatch = useAppDispatch();
  useBodyScrollLock(open);
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Product ID",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <button
          onClick={() => setCouponToDelete(row?.id)}
          className="cursor-pointer text-red-600 hover:text-red-800 transition"
          title="Delete Product"
        >
          <FiTrash2 size={18} />
        </button>
      ),
    },
  ];

  const rows =
    (coupons &&
      coupons?.map((c) => ({
        id: c._id, // DataGrid requires an `id` field
        productId: c.product,
        name: c.name,
        discount: c.discountPercentage,
      }))) ??
    [];

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      console.log(discount);
      await api.post("/coupon", {
        name: couponCode,
        discountPercentage: discount,
        maximumDiscountAmount: maxDiscount,
        product: selectedProduct,
        expiryDate,
      });
      toast.success("Coupon code created successfully");
      dispatch(getCoupons());
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      setOpen(false);

      setCouponCode("");
      setDiscount("");
      setSelectedProduct("");
      setExpiryDate("");
      setMaxDiscount("");
      setMinPurchase("");
    }
  };

  if (CouponLoading || (!error && !coupons))
    return <LoadingDots text="Loading Coupons" />;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Coupons</h1>
          <p className="text-gray-500 mt-1">
            Create and manage discount coupons.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black hover:bg-gray-800 transition text-white px-5 py-2.5 rounded-lg flex items-center gap-2 cursor-pointer"
        >
          <FiPlus />
          Create Coupon
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
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
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Create Coupon</h2>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                <FiX size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
              {/* Coupon Code */}

              <div>
                <label htmlFor="coupon" className="font-medium">
                  Coupon Code <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  />
                </div>
              </div>

              {/* Discount */}

              <div>
                <label htmlFor="discount" className="font-medium">
                  Discount Percentage <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    id="discount"
                    type="number"
                    min={1}
                    max={100}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  />
                </div>
              </div>

              {/* Min Purchase Amount */}
              <div>
                <label htmlFor="minPurchase" className="font-medium">
                  Minimum Purchase Amount{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    id="minPurchase"
                    type="number"
                    min={1}
                    value={minPurchase}
                    onChange={(e) => setMinPurchase(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  />
                </div>
              </div>

              {/* Max Discount */}
              <div>
                <label htmlFor="maxDiscount" className="font-medium">
                  Maximum Discount Amount{" "}
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiPercent className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    id="maxDiscount"
                    min={1}
                    type="number"
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  />
                </div>
              </div>

              {/* Product */}
              <div>
                <label htmlFor="product" className="font-medium">
                  Select Product <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiPackage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <select
                    required
                    id="product"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  >
                    <option value="">Select Product</option>

                    {products.map((product) => (
                      <option key={product?._id} value={product?._id}>
                        {product?.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expiry */}

              <div>
                <label htmlFor="expiry" className="font-medium">
                  Expiry Date <span className="text-red-500">*</span>
                </label>

                <div className="relative mt-1">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    required
                    id="expiry"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full rounded-lg border bg-gray-50 py-2 pl-10"
                  />
                </div>
              </div>

              {/* Footer */}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="border rounded-lg px-5 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white rounded-lg px-6 py-2 cursor-pointer hover:bg-gray-800 transition"
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                    </div>
                  ) : (
                    "Create Coupon"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {couponToDelete !== null && (
        <div
          onClick={() => setCouponToDelete(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FiTrash2 className="text-red-600 text-xl" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Delete Product</h2>

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mt-6 text-gray-700 leading-relaxed">
              Are you sure you want to permanently delete this product? Once
              deleted, it cannot be recovered.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCouponToDelete(null)}
                className="cursor-pointer rounded-lg border px-5 py-2 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() =>
                  dispatch(deleteCoupon(couponToDelete)).then(() =>
                    setCouponToDelete(null),
                  )
                }
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deleteLoading ? <ButtonLoader /> : "Delete Coupon"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
