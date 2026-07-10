"use client";
import { ProductCard } from "../Products/ProductCard";
import { Product } from "@/redux/slices/product";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function BestSellingPage() {
  const { loading, allProducts, error } = useAppSelector(
    (state) => state.products,
  );

  const sortedProducts =
    allProducts && [...allProducts].sort((a, b) => b.sold_out - a.sold_out);

  if (loading || (!error && !allProducts)) return <>loading</>;
  return (
    <section className="px-4 md:px-10 py-4 sm:py-6 md:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {sortedProducts.map((product: Product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
}
