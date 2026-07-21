"use client";

import DeleteModal from "@/components/Layout/Modal/DeleteModal";
import { deleteEvent } from "@/redux/actions/admin";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { useState } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

type EventStatus = "Active" | "Upcoming" | "Expired";
export default function AdminEventsPage() {
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const { events, loading } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: "eventId",
      headerName: "Event ID",
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
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 130,
      renderCell: ({ value }) => {
        const color =
          value === "Active"
            ? "success"
            : value === "Upcoming"
              ? "warning"
              : "error";

        return (
          <Chip label={value} color={color} size="small" variant="filled" />
        );
      },
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
      renderCell: ({ row }) =>
        row.status != "Expired" && (
          <Link
            href={`/products/${row?.eventId}?isEvent=true`}
            className="block pt-3 text-gray-600 hover:text-black transition"
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
          onClick={() => setEventToDelete(row?.eventId)}
          className="cursor-pointer text-red-600 hover:text-red-800 transition"
          title="Delete Product"
        >
          <FiTrash2 size={18} />
        </button>
      ),
    },
  ];

  const findStatus = (start, end) => {
    const now = new Date();

    if (new Date(end) <= now) return "Expired";
    if (new Date(start) > now) return "Upcoming";

    return "Active";
  };

  const rows =
    (events &&
      events?.map((p) => ({
        id: p._id, // DataGrid requires an `id` field
        eventId: p._id,
        name: p.name,
        status: findStatus(p.startDate, p.endDate),
        quantity: p.stock - p.sold_out,
        stock: p.stock,
        sold_out: p.sold_out,
      }))) ??
    [];

  const handleDelete = async () => {
    try {
      dispatch(deleteEvent(eventToDelete));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setEventToDelete(null);
    }
  };

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
        <DeleteModal
          text={"event"}
          handleCancel={() => setEventToDelete(null)}
          handleDelete={handleDelete}
          loading={loading.deleteEvent}
        />
      )}
    </>
  );
}
