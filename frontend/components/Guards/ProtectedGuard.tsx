"use client";
import Loader from "@/components/Layout/Loader";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedGuard({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles: ("user" | "seller" | "admin")[];
}) {
  const router = useRouter();

  const {
    initialized: userInitialized,
    user,
    loading: userLoading,
    error: userError,
    isAuthenticated,
  } = useAppSelector((state) => state.user);

  const {
    initialized: shopInitialized,
    shop,
    loading: shopLoading,
    error: shopError,
    isSeller,
  } = useAppSelector((state) => state.shop);

  const hasAccess =
    (roles.includes("user") && isAuthenticated) ||
    (roles.includes("seller") && isSeller) ||
    (roles.includes("admin") && user?.role === "admin");

  useEffect(() => {
    if (!userInitialized || !shopInitialized) return;
    if (!hasAccess) {
      router.replace("/");
    }
  }, [hasAccess, router, userInitialized, shopInitialized]);

  if (
    userLoading ||
    shopLoading ||
    (!user && !userError && !shop && !shopError) ||
    !hasAccess
  ) {
    return <Loader />;
  }

  return <>{children}</>;
}
