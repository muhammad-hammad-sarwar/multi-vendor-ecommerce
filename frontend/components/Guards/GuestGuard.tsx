"use client";

import Loader from "@/components/Layout/Loader";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuestGuard({
  children,
  blockedRoles,
}: {
  children: React.ReactNode;
  blockedRoles: ("user" | "seller" | "admin")[];
}) {
  const router = useRouter();

  const {
    isAuthenticated,
    initialized: userInitialized,
    user,
    loading: userLoading,
  } = useAppSelector((state) => state.user);

  const {
    isSeller,
    initialized: shopInitialized,
    loading: shopLoading,
  } = useAppSelector((state) => state.shop);

  const hasAccess =
    (blockedRoles.includes("user") && isAuthenticated) ||
    (blockedRoles.includes("seller") && isSeller) ||
    (blockedRoles.includes("admin") && user?.role === "admin");

  useEffect(() => {
    if (!userInitialized || !shopInitialized) return;

    if (hasAccess) {
      router.replace("/");
    }
  }, [hasAccess, router, userInitialized, shopInitialized]);

  if (!userInitialized || !shopInitialized || userLoading || shopLoading) {
    return <Loader />;
  }

  if (hasAccess) {
    return <Loader />;
  }

  return <>{children}</>;
}
