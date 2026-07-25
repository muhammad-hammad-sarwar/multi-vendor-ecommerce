"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import EventCard from "./EventsCard";
import ErrorState from "../Common/ErrorState";
import Loader from "../Layout/Loader";

export default function EventsPage() {
  const { allEvents, loading, error } = useAppSelector((state) => state.events);

  return (
    <section className="px-4 md:px-10 py-4 sm:py-6 md:py-8">
      <div className="flex flex-col gap-6">
        {loading || (!error && !allEvents) ? (
          <Loader />
        ) : error ? (
          <ErrorState message={error} />
        ) : allEvents?.length == 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">
              No Events Found
            </h2>
            <p className="text-sm text-gray-500">
              There are currently no active events.
            </p>
          </div>
        ) : (
          allEvents?.map((event) => (
            <EventCard key={event?._id} event={event} />
          ))
        )}
      </div>
    </section>
  );
}
