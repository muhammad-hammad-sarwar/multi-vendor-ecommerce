import Verify from "@/components/Verify/Verify";
import { Suspense } from "react";

export default function VerifyPage() {
  return (
    <Suspense fallback={<>loading</>}>
      <Verify />
    </Suspense>
  );
}
