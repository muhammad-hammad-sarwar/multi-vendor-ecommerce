"use client";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";
import { useEffect } from "react";
import {
  loadCurrentShopInfo,
  loadCurrentShopProducts,
} from "@/redux/actions/shop.action";

export default function ShopPage() {
  const params = useParams();
  const { currentShop, infoLoading, error, currentShopProducts } =
    useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCurrentShopInfo(params?.slug));
    dispatch(loadCurrentShopProducts(params?.slug));
  }, []);

  if (infoLoading || (!error && !currentShop)) return <ShopPageLoader />;

  return (
    <section className="bg-gray-100 min-h-screen px-10 py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <ShopSidebarInfo
          totalProducts={currentShopProducts?.length}
          shop={currentShop}
          isOwner={false}
        />
        <ShopDetailsInfo products={currentShopProducts} isOwner={false} />
      </div>
    </section>
  );
}
