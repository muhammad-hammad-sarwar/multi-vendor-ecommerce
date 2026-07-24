"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import Loader from "@/components/Layout/Loader";

export default function SellerGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initialized, shop, loading, error } = useAppSelector(
    (state) => state.shop,
  );

  useEffect(() => {
    if (initialized && (!shop || shop?.role !== "seller")) {
      router.replace("/");
    }
  }, [shop, initialized, router]);

  if (loading || (!shop && !error) || shop?.role !== "seller")
    return <Loader />;

  return <>{children}</>;
}
