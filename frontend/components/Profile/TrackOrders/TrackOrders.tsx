"use client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import Link from "next/link";
import { MdOutlineTrackChanges } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import LoadingDots from "@/components/Common/LoadingDots";
import { getAllOrders } from "@/redux/actions/order";
import { useEffect } from "react";

export default function TrackOrders() {
  const { orders, loading, error } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();

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
          Processing: "warning",
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
          href={`/profile/orders/track/${row?.orderId}`}
          className="block pt-3 text-gray-600 hover:text-black transition"
          title="View Order Details"
        >
          <MdOutlineTrackChanges />
        </Link>
      ),
    },
  ];
  const rows = orders
    ? orders?.map((o) => ({
        id: o?._id,
        orderId: o?._id,
        total: o?.totalPrice,
        status: o?.status,
        quantity: o?.cart?.length,
      }))
    : [];

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  if (loading || (!error && !orders))
    return <LoadingDots text="Loading orders..." />;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Track Orders
      </h2>

      <DataGrid
        rows={rows}
        columns={ordersColumns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
