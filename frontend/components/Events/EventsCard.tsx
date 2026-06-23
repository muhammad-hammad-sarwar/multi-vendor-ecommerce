"use client";
import useCountDown from "@/hooks/useCountDown";
import Image from "next/image";
export interface Event {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discount_price?: number | null;
  sold: number;
  time_left: string;
}

export default function EventCard({ event }: { event: Event }) {
  const { timeLeft } = useCountDown(event.time_left);
  return (
    <div className="w-full border rounded-xl flex flex-col md:flex-row overflow-hidden hover:shadow-md transition bg-white">
      <div className="w-full md:w-[320px] h-55 relative shrink-0">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {event.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${event.discount_price || event.price}
              </span>

              {event.discount_price && (
                <span className="text-sm text-red-500 line-through">
                  ${event.price}
                </span>
              )}
            </div>

            <span className="text-xs text-emerald-600">{event.sold} sold</span>
          </div>

          <div className="mt-4 text-sm font-medium text-red-600">
            {timeLeft.days == 0
              ? "Sale Ended!"
              : `Ends in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
          </div>

          <div className="flex items-center gap-5 mt-5">
            <button className="cursor-pointer bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-900 transition">
              Buy Now
            </button>

            <button className="cursor-pointer text-blue-600 hover:underline text-sm">
              See Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
