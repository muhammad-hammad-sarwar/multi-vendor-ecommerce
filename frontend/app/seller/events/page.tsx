"use client";
import LoadingDots from "@/components/Common/LoadingDots";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { deleteSellerEvent } from "@/redux/actions/event";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

type EventStatus = "Active" | "Upcoming" | "Expired";
export default function AllEvents() {
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  const { deleteLoading, events, shopLoading, error } = useAppSelector(
    (state) => state.events,
  );
  useBodyScrollLock(eventToDelete);
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "productId",
      headerName: "Product ID",
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
      field: "quantity",
      headerName: "Item Quantity",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "sold_out",
      headerName: "Sold Out",
      sortable: false,
      filterable: false,
      minWidth: 150,
    },

    {
      field: "view",
      headerName: "View",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <Link
          href={`/products/${row?.productId}`}
          className="text-gray-600 hover:text-black transition"
          title="View Product"
        >
          <FiEye size={18} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      minWidth: 100,
      renderCell: ({ row }) => (
        <button
          onClick={() => setEventToDelete(row?.productId)}
          className="cursor-pointer text-red-600 hover:text-red-800 transition"
          title="Delete Product"
        >
          <FiTrash2 size={18} />
        </button>
      ),
    },
  ];

  const rows =
    (events &&
      events?.map((p) => ({
        id: p._id, // DataGrid requires an `id` field
        productId: p._id,
        name: p.name,
        quantity: p.stock - p.sold_out,
        stock: p.stock,
        sold: p.sold_out,
      }))) ??
    [];

  if (shopLoading || (!error && !events))
    return <LoadingDots text="Loading your events..." />;

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">All Events</h1>

          <p className="text-gray-500 mt-1">Manage all promotional events.</p>
        </div>
      </div>

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

      {eventToDelete !== null && (
        <div
          onClick={() => setEventToDelete(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <FiTrash2 className="text-xl text-red-600" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">Delete Event</h2>

                <p className="text-sm text-gray-500">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <p className="mt-6 leading-relaxed text-gray-700">
              Are you sure you want to permanently delete this event? Once
              deleted, it cannot be recovered.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEventToDelete(null)}
                className="cursor-pointer rounded-lg border px-5 py-2 font-medium transition hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={async () => {
                  try {
                    dispatch(deleteSellerEvent(eventToDelete));
                    setEventToDelete(null);
                  } catch (error) {
                    toast.error(error?.response?.data?.message);
                  }
                }}
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deleteLoading ? <ButtonLoader /> : "Delete Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
