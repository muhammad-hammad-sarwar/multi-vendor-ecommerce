"use client";
import useCountDown from "@/hooks/useCountDown";
import { IEvent } from "@/redux/slices/events";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({ event }: { event: IEvent }) {
  const { timeLeft, isMounted } = useCountDown(`${event?.endDate}`);
  return (
    <div className="w-full border rounded-xl flex flex-col md:flex-row overflow-hidden hover:shadow-md transition bg-white">
      <div className="w-full md:w-[320px] h-55 relative shrink-0">
        <Image
          src={`http://localhost:8000/uploads/${event?.images[0]}`}
          alt={event?.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
          unoptimized
        />
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{event?.name}</h3>

          <p className="text-sm text-gray-500 mt-2 line-clamp-3">
            {event.description}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ${event?.discountPrice || event?.originalPrice}
              </span>

              {event?.discountPrice && (
                <span className="text-sm text-red-500 line-through">
                  ${event?.originalPrice}
                </span>
              )}
            </div>

            <span className="text-xs text-emerald-600">
              {event?.sold_out} sold
            </span>
          </div>

          <div className="mt-4 text-sm font-medium text-red-600">
            {isMounted && timeLeft.days === null ? (
              <div className="bg-red-400 w-40 h-8 rounded-sm animate-pulse" />
            ) : timeLeft.days == 0 ? (
              "Sale Ended!"
            ) : (
              `Ends in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
            )}
          </div>

          <Link href={`/products/${event?._id}?isEvent=true`}>
            <button className="mt-2 cursor-pointer w-36 h-10 rounded-md bg-black text-white font-bold text-sm">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
