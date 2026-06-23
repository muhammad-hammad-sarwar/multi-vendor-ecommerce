"use client";

import { useState } from "react";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email);
  };

  return (
    <section className="w-full bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-white max-w-125">
            <h2 className="text-xl md:text-3xl lg:text-4xl max-w-2xl font-bold">
              <span className="text-[#56D879]">Subscribe</span> us to get news
              events and offers
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-72 px-4 py-2 rounded-lg outline-none text-sm bg-white text-black"
            />

            <button
              type="submit"
              className="bg-[#56D879] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#66c580] transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
