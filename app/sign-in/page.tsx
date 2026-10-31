import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthSection } from "@/components/auth/AuthSection";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or create your aadyosh account to continue your learning.",
};

export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <AuthSection />
    </Suspense>
  );
}
