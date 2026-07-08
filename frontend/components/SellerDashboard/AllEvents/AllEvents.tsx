"use client";
import ButtonLoader from "@/components/Layout/ButtonLoader/ButtonLoader";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCalendar, FiEye, FiTrash2, FiPercent } from "react-icons/fi";

const events = [
  {
    id: 1,
    image: "https://picsum.photos/200?11",
    name: "Summer Sale",
    product: "Nike Air Max",
    discount: 20,
    startDate: "2026-07-15",
    endDate: "2026-07-18",
    status: "Active" as EventStatus,
  },
  {
    id: 2,
    image: "https://picsum.photos/200?12",
    name: "Flash Sale",
    product: "Gaming Mouse",
    discount: 15,
    startDate: "2026-08-05",
    endDate: "2026-08-07",
    status: "Upcoming" as EventStatus,
  },
  {
    id: 3,
    image: "https://picsum.photos/200?13",
    name: "Winter Discount",
    product: "Keyboard",
    discount: 35,
    startDate: "2026-05-01",
    endDate: "2026-05-03",
    status: "Expired" as EventStatus,
  },
];

type EventStatus = "Active" | "Upcoming" | "Expired";
export default function AllEvents() {
  const [loading, setLoading] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);
  useBodyScrollLock(eventToDelete);

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";

      case "Upcoming":
        return "bg-blue-100 text-blue-700";

      case "Expired":
        return "bg-gray-200 text-gray-700";

      default:
        return "";
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">All Events</h1>

          <p className="text-gray-500 mt-1">Manage all promotional events.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-4">Event</th>
              <th className="p-4">Product</th>
              <th className="p-4">Discount</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Event */}

                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={event.image}
                      alt={event.name}
                      width={55}
                      height={55}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <p className="font-semibold">{event.name}</p>

                      <p className="flex items-center gap-1 text-sm text-gray-500">
                        <FiCalendar size={13} />
                        Promotional Event
                      </p>
                    </div>
                  </div>
                </td>

                {/* Product */}

                <td className="p-4 font-medium">{event.product}</td>

                {/* Discount */}

                <td className="p-4">
                  <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-700 text-sm">
                    <FiPercent size={13} />
                    {event.discount}%
                  </div>
                </td>

                {/* Duration */}

                <td className="p-4">
                  <div className="text-sm">
                    <p>{event.startDate}</p>

                    <p className="text-gray-500">{event.endDate}</p>
                  </div>
                </td>

                {/* Status */}

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${getStatusColor(
                      event.status,
                    )}`}
                  >
                    {event.status}
                  </span>
                </td>

                {/* Actions */}

                <td className="p-4">
                  <div className="flex justify-center gap-5">
                    <Link
                      href={`/events/${event.id}`}
                      className="text-gray-600 hover:text-black transition"
                    >
                      <FiEye size={18} />
                    </Link>

                    <button
                      onClick={() => setEventToDelete(event.id)}
                      className="cursor-pointer text-red-600 hover:text-red-800 transition"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            No events found.
          </div>
        )}
      </div>

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
                disabled={loading}
                onClick={async () => {
                  try {
                    setLoading(true);
                    console.log(eventToDelete);
                    setTimeout(() => {
                      setLoading(false);
                      setEventToDelete(null);
                    }, 1500);
                  } catch (error) {
                    console.log(error);
                    setLoading(false);
                  }
                }}
                className="cursor-pointer rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <ButtonLoader /> : "Delete Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
