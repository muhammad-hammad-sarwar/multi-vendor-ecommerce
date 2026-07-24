"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";
import { useEffect } from "react";
import { loadSellerProducts } from "@/redux/actions/product";
import { loadSellerEvents } from "@/redux/actions/event";
import ProtectedGuard from "@/components/Guards/ProtectedGuard";
import Loader from "@/components/Layout/Loader";

export default function ShopPage() {
  const { shop, loading, error } = useAppSelector((state) => state.shop);
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

  if (loading || (!error && !shop)) return <Loader />;
  const averageRating = totalRatings / reviews.length;

  return (
    <ProtectedGuard roles={["seller"]}>
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
    </ProtectedGuard>
  );
}
