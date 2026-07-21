"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function AdminSellersPage() {
  const { sellers } = useAppSelector((state) => state.admin);
  const columns: GridColDef[] = [
    {
      field: "sellerId",
      headerName: "Seller ID",
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
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Verified",
      flex: 1,
      minWidth: 120,
      renderCell: ({ value }) => (
        <Chip
          label={value ? "Verified" : "Not Verified"}
          color={value ? "success" : "error"}
          size="small"
          variant="filled"
        />
      ),
    },
  ];

  const rows =
    (sellers &&
      sellers?.map((s) => ({
        id: s._id,
        sellerId: s._id,
        name: s.name,
        email: s.email,
        status: s.isVerified,
        address: s.address,
      }))) ??
    [];

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">All Seller</h1>
      <p className="mt-2 mb-8 text-gray-500">Manage your all sellers.</p>

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
    </>
  );
}
