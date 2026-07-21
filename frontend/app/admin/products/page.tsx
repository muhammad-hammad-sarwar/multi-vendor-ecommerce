"use client";
import DeleteModal from "@/components/Layout/Modal/DeleteModal";
import { deleteProduct } from "@/redux/actions/admin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

export default function AdminProductsPage() {
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { products, loading } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
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
      field: "sold",
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
          className="block pt-3 text-gray-600 hover:text-black transition"
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
  const rows =
    (products &&
      products?.map((p) => ({
        id: p._id, // DataGrid requires an `id` field
        productId: p._id,
        name: p.name,
        quantity: p.stock - p.sold_out,
        stock: p.stock,
        sold: p.sold_out,
      }))) ??
    [];

  const handleDelete = async () => {
    try {
      dispatch(deleteProduct(productToDelete));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setProductToDelete(null);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">All Products</h1>
      <p className="mt-2 mb-8 text-gray-500">Manage your all products.</p>

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

      {productToDelete !== null && (
        <DeleteModal
          text={"product"}
          handleCancel={() => setProductToDelete(null)}
          handleDelete={handleDelete}
          loading={loading.deleteProduct}
        />
      )}
    </>
  );
}
