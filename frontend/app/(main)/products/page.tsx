import ProductsPage from "@/components/Products/ProductsPage";
import { Suspense } from "react";

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="px-4 md:px-10 py-6">
          <h2>Loading products...</h2>
        </div>
      }
    >
      <ProductsPage />
    </Suspense>
  );
}
