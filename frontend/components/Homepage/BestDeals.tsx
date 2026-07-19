"use client";
import { ProductCard } from "../Products/ProductCard";
import { Product } from "@/redux/slices/product";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function BestDeals() {
  const { loading, allProducts, error } = useAppSelector(
    (state) => state.products,
  );

  const data =
    allProducts &&
    [...allProducts].sort((a, b) => b.sold_out - a.sold_out).slice(0, 5);

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

      {loading || (!error && !allProducts) ? (
        <div className="flex flex-col items-center justify-center gap-3 text-gray-500 py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-sm">Loading Best Deals...</p>
        </div>
      ) : data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 bg-gray-50 py-10">
          <h2 className="text-lg font-semibold text-gray-700">
            No Products Found
          </h2>
          <p className="text-sm text-gray-500">
            There are currently no products available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
