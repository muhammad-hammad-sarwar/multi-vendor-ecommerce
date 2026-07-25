"use client";
import api from "@/axios/api";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import Loader from "@/components/Layout/Loader";
import { getWithdrawRequests } from "@/redux/actions/withdraw";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminWithdrawPage() {
  const dispatch = useAppDispatch();
  const [approving, setApproving] = useState(false);
  const { withdrawRequests, loading, error } = useAppSelector(
    (state) => state.withdraw,
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Withdraw Request ID",
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
          Success: "success",
          "Refund Success": "success",
          Processing: "warning",
        };

        return <Chip label={status} color={colorMap[status]} size="small" />;
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "seller",
      headerName: "Seller",
      flex: 1,
      display: "flex",
      align: "center",
      minWidth: 120,
    },
    {
      field: "approve",
      headerName: "Approve Request",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => {
        const status = params.row.status;

        return (
          status === "Processing" && (
            <button
              disabled={approving}
              onClick={async () => {
                try {
                  setApproving(true);
                  await api.patch(`/withdraw/${params.id}/approve`);
                  toast.success("Request approved successfully");
                  dispatch(getWithdrawRequests(true));
                } catch (error) {
                  toast.error(error?.response?.data?.message);
                } finally {
                  setApproving(false);
                }
              }}
              className="mx-auto flex h-9 min-w-24 items-center justify-center rounded-md bg-green-600 px-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {approving ? <ButtonLoader /> : "Approve"}
            </button>
          )
        );
      },
    },
  ];

  const rows = withdrawRequests
    ? withdrawRequests?.map((w) => ({
        id: w?._id,
        status: w?.status,
        amount: w?.amount,
        seller: w?.seller?._id,
      }))
    : [];

  if (loading.get || (!error && !withdrawRequests)) return <Loader />;

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">
        All Withdraw Requests
      </h1>
      <p className="mt-2 mb-8 text-gray-500">
        View and manage all withdraw requests in one place.
      </p>

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
