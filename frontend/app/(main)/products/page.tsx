import Loader from "@/components/Layout/Loader";
import ProductsPage from "@/components/Products/ProductsPage";
import { Suspense } from "react";

export default function Products() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsPage />
    </Suspense>
  );
}
