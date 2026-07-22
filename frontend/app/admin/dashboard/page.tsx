"use client";
import Link from "next/link";
import { Wallet, ShoppingBag, Store, ArrowRight } from "lucide-react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { FiEye } from "react-icons/fi";

import { useAppSelector } from "@/redux/hooks/hooks";

export default function AdminDashboard() {
  const { user } = useAppSelector((state) => state.user);
  const { orders, sellers, loading, error } = useAppSelector(
    (state) => state.admin,
  );

  const ordersColumns: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 140,
      renderCell: ({ value }) => {
        const colorMap: Record<
          string,
          "success" | "warning" | "error" | "info"
        > = {
          Delivered: "success",
          "Refund Success": "success",
          Processing: "warning",
          "Refund Processing": "warning",
          "On the way": "info",
        };

        return <Chip label={value} color={colorMap[value]} size="small" />;
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      flex: 1,
      minWidth: 130,
      renderCell: ({ value }) => (
        <Chip
          label={value === "succeeded" ? "Paid" : "Pending"}
          color={value === "succeeded" ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Items",
      flex: 1,
      minWidth: 100,
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
        <Link href={`/admin/orders/${row.orderId}`} className="pt-3 block">
          <FiEye size={18} />
        </Link>
      ),
    },
  ];

  const rows =
    (orders &&
      orders?.map((o) => ({
        id: o._id,
        orderId: o._id,
        total: o.totalPrice,
        quantity: o.cart.length,
        status: o.status,
        payment: o.paymentInfo?.status,
      }))) ??
    [];

  const totalEarnings =
    orders?.reduce((acc, order) => {
      if (order.paymentInfo?.status === "succeeded") {
        return acc + order.totalPrice * 0.1;
      }

      return acc;
    }, 0) ?? 0;

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>

      <p className="mt-2 mb-8 text-gray-500">
        Manage your marketplace and monitor overall performance.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Total Earnings */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading.orders || (!error && !orders) ? (
            <div className="flex h-38 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Earnings
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    10% commission from successful payments
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-100 p-3">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                ${totalEarnings.toFixed(2)}
              </h2>
            </>
          )}
        </div>

        {/* Sellers */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading.sellers || (!error && !sellers) ? (
            <div className="flex h-38 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">All Sellers</p>

                <div className="rounded-xl bg-blue-100 p-3">
                  <Store className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {sellers?.length}
              </h2>

              <Link
                href="/admin/sellers"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                View Sellers
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        {/* Orders */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading.orders || (!error && !orders) ? (
            <div className="flex h-38 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">All Orders</p>

                <div className="rounded-xl bg-violet-100 p-3">
                  <ShoppingBag className="h-6 w-6 text-violet-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {orders?.length}
              </h2>

              <Link
                href="/admin/orders"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition"
              >
                View Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>

      <h2 className="mt-8 mb-2 text-xl font-bold">Latest Orders</h2>

      {loading.orders || (!error && !orders) ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        </div>
      ) : (
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
      )}
    </>
  );
}
