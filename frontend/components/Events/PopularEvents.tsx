import { useAppSelector } from "@/redux/hooks/hooks";
import EventCard from "./EventsCard";

export default function PopularEvents() {
  const { allEvents, loading } = useAppSelector((state) => state.events);
  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        Popular Events
      </h2>

      <div className="flex flex-col gap-6 rounded-lg">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="text-sm">Loading events...</p>
          </div>
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
