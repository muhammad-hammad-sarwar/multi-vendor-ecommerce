import { useEffect } from "react";

export default function useBodyScrollLock(isLocked: number | boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const originalOverflow = document.body.style.overflow;

    if (isLocked !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLocked]);
}
