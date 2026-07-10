"use client";
import { ProductCard } from "./ProductCard";
import { useSearchParams } from "next/navigation";
import { Product } from "@/redux/slices/product";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function ProductsPage() {
  const params = useSearchParams();
  const category = params.get("category");
  const { loading, allProducts, error } = useAppSelector(
    (state) => state.products,
  );

  if (loading || (!error && !allProducts)) return <>loading</>;

  const filteredData =
    allProducts && category
      ? allProducts.filter((d) => d.category && d.category == category)
      : allProducts;

  return (
    <section className="px-4 md:px-10 py-4 sm:py-6 md:py-8">
      {filteredData?.length === 0 ? (
        <h2>
          No <span className="font-semibold">{category}</span> Products
          Available!
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredData?.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
