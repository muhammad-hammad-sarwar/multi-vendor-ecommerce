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
  redirectTo?: string;
}) {
  const router = useRouter();

  const {
    initialized: userInitialized,
    user,
    loading: userLoading,
  } = useAppSelector((state) => state.user);

  const {
    initialized: shopInitialized,
    shop,
    loading: shopLoading,
  } = useAppSelector((state) => state.shop);

  const role = user?.role || shop?.role;

  useEffect(() => {
    if (!userInitialized || !shopInitialized) return;

    if (role && blockedRoles.includes(role)) {
      router.replace("/");
    }
  }, [role, blockedRoles, router, userInitialized, shopInitialized]);

  if (!userInitialized || !shopInitialized || userLoading || shopLoading) {
    return <></>;
  }

  if (role && blockedRoles.includes(role)) {
    return <></>;
  }

  return <>{children}</>;
}
