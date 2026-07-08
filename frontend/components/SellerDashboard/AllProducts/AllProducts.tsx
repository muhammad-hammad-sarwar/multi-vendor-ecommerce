"use client";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiPackage, FiTrash2 } from "react-icons/fi";
const products = [
  {
    id: 1,
    image: "https://picsum.photos/200?1",
    name: "Nike Air Max",
    category: "Shoes",
    price: 120,
    stock: 18,
    sold: 55,
  },
  {
    id: 2,
    image: "https://picsum.photos/200?2",
    name: "Gaming Mouse",
    category: "Electronics",
    price: 40,
    stock: 32,
    sold: 180,
  },
  {
    id: 3,
    image: "https://picsum.photos/200?3",
    name: "Mechanical Keyboard",
    category: "Accessories",
    price: 90,
    stock: 7,
    sold: 93,
  },
  {
    id: 4,
    image: "https://picsum.photos/200?4",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 175,
    stock: 25,
    sold: 66,
  },
];

export default function AllProducts() {
  const [loading, setLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  useBodyScrollLock(productToDelete);

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Products</h1>

          <p className="text-gray-500 mt-1">Manage all your products.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Sold</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={55}
                      height={55}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold">{product.name}</p>

                      <p className="flex items-center gap-1 text-sm text-gray-500">
                        <FiPackage size={13} />
                        Product
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {product.category}
                  </span>
                </td>

                <td className="p-4 font-medium">${product.price}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      product.stock <= 10
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="p-4 font-medium">{product.sold}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-5">
                    <Link
                      href={`/products/${product.id}`}
                      className="text-gray-600 hover:text-black transition"
                      title="View Product"
                    >
                      <FiEye size={18} />
                    </Link>

                    <button
                      onClick={() => setProductToDelete(product.id)}
                      className="cursor-pointer text-red-600 hover:text-red-800 transition"
                      title="Delete Product"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
      {productToDelete !== null && (
        <div
          onClick={() => setProductToDelete(null)}
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
                onClick={() => setProductToDelete(null)}
                className="cursor-pointer rounded-lg border px-5 py-2 font-medium hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={async () => {
                  try {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setProductToDelete(null);
                    }, 1500);
                  } catch (error) {
                    console.log(error);

                    setLoading(false);
                  }
                }}
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <ButtonLoader /> : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
