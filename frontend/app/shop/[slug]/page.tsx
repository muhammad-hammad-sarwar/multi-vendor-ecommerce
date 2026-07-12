"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";
import { useEffect } from "react";
import { loadSellerProducts } from "@/redux/actions/product";

export default function ShopPage() {
  const { shop, loading } = useAppSelector((state) => state.shop);
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSellerProducts());
  }, []);

  if (loading || !shop) return <ShopPageLoader />;
  return (
    <section className="bg-gray-100 min-h-screen px-10 py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <ShopSidebarInfo
          totalProducts={products?.length}
          shop={shop}
          isOwner={true}
        />
        <ShopDetailsInfo products={products} isOwner={true} />
      </div>
    </section>
  );
}
