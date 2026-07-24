"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import Loader from "@/components/Layout/Loader";

export default function AdminGuard({
  children,
  isUser = false,
}: {
  children: React.ReactNode;
  isUser?: boolean;
}) {
  const router = useRouter();
  const { initialized, user, loading, error } = useAppSelector(
    (state) => state.user,
  );

  useEffect(() => {
    if (
      initialized &&
      (!user || (isUser ? user?.role !== "user" : user?.role !== "admin"))
    ) {
      router.replace("/");
    }
  }, [user, initialized, router]);

  if (
    loading ||
    (!user && !error) ||
    (isUser ? user?.role !== "user" : user?.role !== "admin")
  )
    return <Loader />;

  return <>{children}</>;
}
