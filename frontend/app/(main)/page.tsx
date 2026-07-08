"use client";
import BestDeals from "@/components/Homepage/BestDeals";
import Categories from "@/components/Layout/Header/Categories";
import FeaturedProducts from "@/components/Products/FeaturedProducts";
import FeaturesBar from "@/components/Homepage/FeaturesBar";
import HeroSection from "@/components/Homepage/HeroSection";
import PopularEvents from "@/components/Events/PopularEvents";
import SubscribeSection from "@/components/Homepage/SubscribeSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <div className="py-4 md:py-6 lg:py-8 bg-gray-100 space-y-4 md:space-y-6 lg:space-y-8">
        <FeaturesBar />
        <Categories />
        <BestDeals />
        <PopularEvents />
        <FeaturedProducts />
      </div>
      <SubscribeSection />
    </div>
  );
}
