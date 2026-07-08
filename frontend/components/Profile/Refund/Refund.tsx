"use client";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Chip, Button } from "@mui/material";

export default function Refunds() {
  const rows = [
    {
      id: 1,
      refundId: "#REF-1001",
      orderId: "#ORD-1001",
      status: "Approved",
      amount: "$120.00",
    },
    {
      id: 2,
      refundId: "#REF-1002",
      orderId: "#ORD-1005",
      status: "Pending",
      amount: "$75.00",
    },
    {
      id: 3,
      refundId: "#REF-1003",
      orderId: "#ORD-1010",
      status: "Rejected",
      amount: "$45.00",
    },
  ];

  const columns: GridColDef[] = [
    {
      field: "refundId",
      headerName: "Refund ID",
      flex: 1,
      minWidth: 150,
    },
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
        const colorMap: Record<string, "success" | "warning" | "error"> = {
          Approved: "success",
          Pending: "warning",
          Rejected: "error",
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
      field: "amount",
      headerName: "Refund Amount",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      minWidth: 140,
      renderCell: () => (
        <Button variant="outlined" size="small">
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Refund Requests
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
