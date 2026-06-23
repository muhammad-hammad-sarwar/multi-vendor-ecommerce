import { popularEvents } from "@/lib/utils/static";
import Image from "next/image";
import EventCard from "./EventsCard";

export default function PopularEvents() {
  return (
    <section className="w-11/12 mx-auto py-10">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
        Popular Events
      </h2>

      <div className="flex flex-col gap-6 rounded-lg">
        {popularEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
