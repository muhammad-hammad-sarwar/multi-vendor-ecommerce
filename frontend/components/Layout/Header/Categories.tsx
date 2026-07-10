import Link from "next/link";
import Image from "next/image";
import { categoriesData } from "@/lib/utils/static";

export default function Categories() {
  return (
    <section className="py-10 mx-auto max-w-11/12 rounded-lg">
      <div className=" mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
          {categoriesData.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.title)}`}
              className="flex flex-col items-center bg-white text-center p-4 rounded-xl hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="w-16 h-16 relative mb-3">
                <Image
                  src={cat.image_Url}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm font-medium text-gray-800 line-clamp-2">
                {cat.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
