"use client";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import ShopPageLoader from "@/components/Shop/ShopProfileLoader";
import ShopSidebarInfo from "@/components/Shop/ShopSidebarInfo";
import ShopDetailsInfo from "@/components/Shop/ShopDetailsInfo";

export default function ShopPage() {
  const params = useSearchParams();
  const shopId = params.get("shopId");
  const { shop, loading } = useAppSelector((state) => state.shop);

  if (loading || !shop) return <ShopPageLoader />;

  return (
    <section className="bg-gray-100 min-h-screen px-10 py-10">
      <div className="mx-auto flex max-w-7xl gap-8">
        <ShopSidebarInfo isOwner={false} />
        <ShopDetailsInfo isOwner={false} />
      </div>
    </section>
  );
}
