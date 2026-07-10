"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "../Products/ProductCard";
import { productData } from "@/lib/utils/static";
import { Product } from "@/redux/slices/product";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function BestDeals() {
  const { loading, allProducts } = useAppSelector((state) => state.products);

  allProducts &&
    allProducts.sort((a, b) => b?.sold_out - a?.sold_out)?.slice(0, 5);
  if (loading && !allProducts) return <>loading</>;

  return (
    <section className="mx-auto max-w-11/12 py-10">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          Best Deals
        </h2>
        <p className="text-sm text-gray-500">
          Grab the best offers before they&apos;re gone
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {allProducts?.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
