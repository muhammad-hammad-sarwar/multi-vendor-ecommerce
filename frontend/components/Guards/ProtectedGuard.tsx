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
  } = useAppSelector((state) => state.user);

  const {
    initialized: shopInitialized,
    shop,
    loading: shopLoading,
    error: shopError,
  } = useAppSelector((state) => state.shop);

  const role = user?.role || shop?.role;

  useEffect(() => {
    if (!userInitialized || !shopInitialized) return;

    if (!role || !roles.includes(role)) {
      router.replace("/");
    }
  }, [role, roles, router, userInitialized, shopInitialized]);

  if (
    userLoading ||
    shopLoading ||
    (!user && !userError && !shop && !shopError) ||
    !roles.includes(role as "user" | "seller" | "admin")
  ) {
    return <Loader />;
  }

  return <>{children}</>;
}
