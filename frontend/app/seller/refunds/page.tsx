"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import Loader from "@/components/Layout/Loader";

export default function SellerRefunds() {
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const ordersColumns: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
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
          Delivered: "success",
          "Refund Success": "success",
          Processing: "warning",
          "Refund Processing": "warning",
          Shipped: "info",
          Cancelled: "error",
        };

        return <Chip label={status} color={colorMap[status]} size="small" />;
      },
    },
    {
      field: "quantity",
      headerName: "Item Quantity",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Link
          href={`/seller/orders/${row?.orderId}`}
          className="block pt-3 text-gray-600 hover:text-black transition"
          title="View Order Details"
        >
          <FiEye size={18} />
        </Link>
      ),
    },
  ];
  const rows = orders
    ? orders
        ?.filter(
          (o) =>
            o?.status === "Refund Processing" || o?.status === "Refund Success",
        )
        ?.map((o) => ({
          id: o?._id,
          orderId: o?._id,
          total: o?.totalPrice,
          status: o?.status,
          quantity: o?.cart?.length,
        }))
    : [];

  if (loading || (!error && !orders)) return <Loader />;

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Refunds</h1>
      <p className="mt-2 mb-8 text-gray-500">
        Manage refund requests and keep track of their status in one place.
      </p>

      <DataGrid
        rows={rows}
        columns={ordersColumns}
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
    </>
  );
}
