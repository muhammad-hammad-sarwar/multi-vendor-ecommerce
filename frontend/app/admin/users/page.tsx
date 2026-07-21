"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function AdminUsersPage() {
  const { users } = useAppSelector((state) => state.admin);
  const columns: GridColDef[] = [
    {
      field: "userId",
      headerName: "User ID",
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
    // {
    //   field: "address",
    //   headerName: "Address",
    //   sortable: false,
    //   filterable: false,
    //   minWidth: 150,
    // },
  ];
  const rows =
    (users &&
      users?.map((u) => ({
        id: u._id,
        userId: u._id,
        name: u.name,
        email: u.email,
        status: u.isVerified,
        // address: `${u.city}`
      }))) ??
    [];
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">All User</h1>
      <p className="mt-2 mb-8 text-gray-500">Manage your all users.</p>

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
