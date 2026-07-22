"use client";
import Link from "next/link";
import { Wallet, Package, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { FiEye } from "react-icons/fi";

export default function SellerDashboard() {
  const { shop } = useAppSelector((state) => state.shop);
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  const {
    orders,
    error: orderError,
    loading: orderLoading,
  } = useAppSelector((state) => state.order);

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
    ? [...orders] // cant mutate original orders
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((o) => ({
          id: o._id,
          orderId: o._id,
          total: o.totalPrice,
          status: o.status,
          quantity: o.cart.length,
        }))
    : [];

  const availableBalance = shop?.availableBalance;
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Dashboard</h1>
      <p className="mt-2 mb-8 text-gray-500">
        Check your progress, recent updates.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {orderLoading || (!orderError && !orders) ? (
            <div className="flex h-38 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Account Balance
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    (10% service charges applied)
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-100 p-3">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                ${availableBalance}
              </h2>

              <Link
                href="/seller/withdraw"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
              >
                Withdraw Money
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {orderLoading || (!orderError && !orders) ? (
            <div className="flex h-38  items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">All Orders</p>

                <div className="rounded-xl bg-blue-100 p-3">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {rows?.length}
              </h2>

              <Link
                href="/seller/orders"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading || (!error && !products) ? (
            <div className="flex h-38 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  All Products
                </p>

                <div className="rounded-xl bg-violet-100 p-3">
                  <Package className="h-6 w-6 text-violet-600" />
                </div>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                {products?.length}
              </h2>

              <Link
                href="/seller/products"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
              >
                View Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </div>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-2">Latest Orders</h2>
      {orderLoading || (!orderError && !orders) ? (
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
