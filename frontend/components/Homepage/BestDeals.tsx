"use client";
import { useEffect, useState } from "react";
import { Product, ProductCard } from "../Products/ProductCard";
import { productData } from "@/lib/utils/static";

export default function BestDeals() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const data =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = data.slice(0, 5);

    setProducts(firstFive);
  }, [productData]);

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
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
