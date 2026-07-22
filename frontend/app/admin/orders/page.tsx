"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function AdminOrdersPage() {
  const { orders } = useAppSelector((state) => state.admin);
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

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">All Orders</h1>
      <p className="mt-2 mb-8 text-gray-500">
        View and manage all your orders in one place.
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
