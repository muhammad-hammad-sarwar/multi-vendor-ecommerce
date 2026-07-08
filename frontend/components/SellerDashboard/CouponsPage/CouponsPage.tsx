"use client";
import { useEffect, useState } from "react";
import {
  FiPlus,
  FiTag,
  FiPercent,
  FiPackage,
  FiCalendar,
  FiEdit2,
  FiTrash2,
  FiX,
} from "react-icons/fi";

export default function CouponsPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const products = [
    "Nike Air Max",
    "Gaming Mouse",
    "MacBook Pro",
    "Mechanical Keyboard",
  ];

  const coupons = [
    {
      id: 1,
      code: "SUMMER20",
      product: "Nike Air Max",
      discount: 20,
      expiry: "2026-08-12",
    },
    {
      id: 2,
      code: "SAVE10",
      product: "Gaming Mouse",
      discount: 10,
      expiry: "2026-09-01",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setOpen(false);

      setCouponCode("");
      setDiscount("");
      setSelectedProduct("");
      setExpiryDate("");
    }, 1500);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

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
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Coupon</th>
              <th className="p-4">Product</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Expiry</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{coupon.code}</td>

                <td className="p-4">{coupon.product}</td>

                <td className="p-4">{coupon.discount}%</td>

                <td className="p-4">{coupon.expiry}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      <FiEdit2 />
                    </button>

                    <button className="text-red-600 hover:text-red-800 cursor-pointer">
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
                      <option key={product} value={product}>
                        {product}
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
    </>
  );
}
