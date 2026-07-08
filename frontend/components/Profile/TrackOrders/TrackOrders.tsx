"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Button } from "@mui/material";

const rows = [
  {
    id: 1,
    orderId: "#ORD-1001",
    carrier: "DHL",
    trackingNumber: "DHL123456",
    status: "In Transit",
    deliveryDate: "28 Jun 2026",
  },
  {
    id: 2,
    orderId: "#ORD-1002",
    carrier: "FedEx",
    trackingNumber: "FDX987654",
    status: "Out for Delivery",
    deliveryDate: "26 Jun 2026",
  },
  {
    id: 3,
    orderId: "#ORD-1003",
    carrier: "UPS",
    trackingNumber: "UPS456789",
    status: "Delivered",
    deliveryDate: "24 Jun 2026",
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
    field: "carrier",
    headerName: "Carrier",
    flex: 1,
    minWidth: 130,
  },
  {
    field: "trackingNumber",
    headerName: "Tracking No",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "status",
    headerName: "Current Status",
    flex: 1,
    minWidth: 180,
    renderCell: (params) => {
      const colorMap: Record<string, "success" | "warning" | "info"> = {
        Delivered: "success",
        "Out for Delivery": "warning",
        "In Transit": "info",
      };

      return (
        <Chip
          label={params.value}
          color={colorMap[params.value]}
          size="small"
        />
      );
    },
  },
  {
    field: "deliveryDate",
    headerName: "Expected Delivery",
    flex: 1,
    minWidth: 180,
  },
  {
    field: "actions",
    headerName: "Actions",
    sortable: false,
    filterable: false,
    minWidth: 150,
    renderCell: () => (
      <Button variant="outlined" size="small">
        Track
      </Button>
    ),
  },
];

export default function TrackOrders() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Track Orders
      </h2>

      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
}
