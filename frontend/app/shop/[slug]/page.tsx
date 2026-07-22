"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";
import { useEffect } from "react";
import { loadSellerProducts } from "@/redux/actions/product";
import { loadSellerEvents } from "@/redux/actions/event";

export default function ShopPage() {
  const { shop, loading } = useAppSelector((state) => state.shop);
  const { products } = useAppSelector((state) => state.products);
  const { events } = useAppSelector((state) => state.events);
  const dispatch = useAppDispatch();

  const reviews = [];
  products &&
    products.forEach((p) =>
      p.reviews?.length > 0 ? reviews.push(...p.reviews) : null,
    );

  let totalRatings = reviews.reduce((s, r) => s + r?.rating, 0);

  useEffect(() => {
    dispatch(loadSellerProducts());
    dispatch(loadSellerEvents());
  }, []);

  if (loading || !shop) return <ShopPageLoader />;
  const averageRating = totalRatings / reviews.length;

  return (
    <section className="bg-gray-100 min-h-screen px-10 py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <ShopSidebarInfo
          averageRating={averageRating}
          totalProducts={products?.length}
          shop={shop}
          isOwner={true}
        />
        <ShopDetailsInfo
          events={events}
          reviews={reviews}
          products={products}
          isOwner={true}
        />
      </div>
    </section>
  );
}
