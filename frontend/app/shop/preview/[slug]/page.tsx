"use client";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";
import { useEffect } from "react";
import {
  loadCurrentShopEvents,
  loadCurrentShopInfo,
  loadCurrentShopProducts,
} from "@/redux/actions/shop.action";

export default function ShopPage() {
  const params = useParams();
  const {
    currentShop,
    infoLoading,
    error,
    currentShopProducts,
    currentShopEvents,
  } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  const reviews = [];
  currentShopProducts &&
    currentShopProducts.forEach((p) =>
      p.reviews?.length > 0 ? reviews.push(...p.reviews) : null,
    );

  let totalRatings = reviews.reduce((s, r) => s + r?.rating, 0);

  useEffect(() => {
    dispatch(loadCurrentShopInfo(params?.slug));
    dispatch(loadCurrentShopProducts(params?.slug));
    dispatch(loadCurrentShopEvents(params?.slug));
  }, []);

  if (infoLoading || (!error && !currentShop)) return <ShopPageLoader />;

  return (
    <section className="bg-gray-100 min-h-screen px-10 py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <ShopSidebarInfo
          averageRating={(totalRatings / reviews.length).toFixed(2)}
          totalProducts={currentShopProducts?.length}
          shop={currentShop}
          isOwner={false}
        />
        <ShopDetailsInfo
          events={currentShopEvents}
          reviews={reviews}
          products={currentShopProducts}
          isOwner={false}
        />
      </div>
    </section>
  );
}
