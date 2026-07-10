"use client";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { useAppSelector } from "@/redux/hooks/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

export default function AllProducts() {
  const [loading, setLoading] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);
  const {} = useAppSelector((state) => state.shop);
  useBodyScrollLock(productToDelete);

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
      field: "quantity",
      headerName: "Item Quantity",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sold_out",
      headerName: "Sold Out",
      sortable: false,
      filterable: false,
      minWidth: 150,
    },

    {
      field: "view",
      headerName: "View",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Link
          href={`/products/${row?.productId}`}
          className="text-gray-600 hover:text-black transition"
          title="View Product"
        >
          <FiEye size={18} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <button
          onClick={() => setProductToDelete(row?.productId)}
          className="cursor-pointer text-red-600 hover:text-red-800 transition"
          title="Delete Product"
        >
          <FiTrash2 size={18} />
        </button>
      ),
    },
  ];

  const rows = [{}];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">All Products</h1>
      <p className="mt-2 mb-8 text-gray-500">Manage your all products.</p>

      <DataGrid
        // rows={rows}
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
