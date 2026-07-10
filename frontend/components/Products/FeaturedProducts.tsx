"use client";
import { productData } from "@/lib/utils/static";
import { ProductCard } from "./ProductCard";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Product } from "@/redux/slices/product";

export default function FeaturedProducts() {
  const { loading, allProducts } = useAppSelector((state) => state.products);

  if (loading && !allProducts) return <>loading</>;
  return (
    <section className="mx-auto max-w-11/12 py-10">
      <div>
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            Featured Products
          </h2>
          <p className="text-sm text-gray-500">
            Discover our most popular items
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {allProducts?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
