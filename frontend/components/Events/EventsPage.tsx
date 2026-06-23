import { popularEvents } from "@/lib/utils/static";
import EventCard from "./EventsCard";

export default function EventsPage() {
  return (
    <section className="px-4 md:px-10 py-4 sm:py-6 md:py-8">
      <div className="flex flex-col gap-6">
        {popularEvents.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </section>
  );
}
