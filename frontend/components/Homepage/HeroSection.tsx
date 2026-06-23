import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[62vh] md:h-[70vh] lg:h-[81vh]">
      <Image
        priority
        fill
        src="https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg"
        alt="Home decoration banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative h-full flex items-center">
        <div className="max-w-3xl px-8 sm:px-10 md:px-20 lg:px-36">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            Best Collection for Home Decoration
          </h1>

          <p className="text-sm sm:text-base mb-6 line-clamp-3 sm:line-clamp-none">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
            voluptates dolorem tenetur nulla quidem reprehenderit provident
            sapiente ipsa, voluptas minima.
          </p>

          <button className="bg-[#000000] text-white hover:bg-gray-800 transition px-6 py-3 rounded-lg text-sm sm:text-lg font-bold">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
