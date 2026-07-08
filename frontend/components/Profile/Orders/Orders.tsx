"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Button, Box } from "@mui/material";

const rows = [
  {
    id: 1,
    orderId: "#ORD-1001",
    status: "Delivered",
    quantity: 3,
    total: "$120.00",
  },
  {
    id: 2,
    orderId: "#ORD-1002",
    status: "Processing",
    quantity: 1,
    total: "$45.00",
  },
  {
    id: 3,
    orderId: "#ORD-1003",
    status: "Shipped",
    quantity: 5,
    total: "$220.00",
  },
  {
    id: 4,
    orderId: "#ORD-1004",
    status: "Cancelled",
    quantity: 2,
    total: "$80.00",
  },
  {
    id: 5,
    orderId: "#ORD-1005",
    status: "Delivered",
    quantity: 4,
    total: "$175.00",
  },
];

const columns: GridColDef[] = [
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

      const colorMap: Record<string, "success" | "warning" | "error" | "info"> =
        {
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
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    minWidth: 150,
    renderCell: () => (
      <Button size="small" variant="outlined">
        View
      </Button>
    ),
  },
];

export default function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h2>
      {/* <div className="w-full overflow-auto"> */}
      <DataGrid
        // className="max-w-full h-100"
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
      {/* </div> */}
    </div>
  );
}
