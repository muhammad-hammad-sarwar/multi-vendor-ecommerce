import { productData } from "@/lib/utils/static";
import { Product, ProductCard } from "../Products/ProductCard";

export default function BestSellingPage() {
  const sortedProducts = [...productData].sort(
    (a, b) => b.total_sell - a.total_sell,
  );

  return (
    <section className="px-4 md:px-10 py-4 sm:py-6 md:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {sortedProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
