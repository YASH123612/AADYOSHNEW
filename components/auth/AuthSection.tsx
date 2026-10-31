"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { clerkDomain, inlineAppearance } from "@/lib/clerk";

/** The /sign-in page body: Clerk's inline sign-in (or sign-up) form inside our own card. */
export function AuthSection() {
  const router = useRouter();
  const signup = useSearchParams().get("mode") === "signup";
  const { status, signedIn, clerk } = useAuth();
  const mountRef = useRef<HTMLDivElement>(null);

  // already signed in: nothing to do here
  useEffect(() => { if (signedIn) router.replace("/"); }, [signedIn, router]);

  // draw Clerk's form into the card whenever Clerk is ready or the tab changes
  useEffect(() => {
    const el = mountRef.current;
    if (status !== "ready" || !clerk || !el || clerk.user) return;
    const opts = { appearance: inlineAppearance, routing: "virtual", signInUrl: "/sign-in", signUpUrl: "/sign-in?mode=signup", forceRedirectUrl: "/" };
    if (signup) clerk.mountSignUp(el, opts); else clerk.mountSignIn(el, opts);
    return () => { if (signup) clerk.unmountSignUp?.(el); else clerk.unmountSignIn?.(el); };
  }, [status, clerk, signup]);

  const failed = status === "failed";
  const isLocal = typeof window !== "undefined" && /^(localhost|127\.|\[::1\])/.test(window.location.hostname);

  return (
    <section className="page-hero auth-hero">
      <div className="container">
        <h1 id="authTitle">{signup ? "Create your account" : "Welcome back"}</h1>
        <p className="lead">Sign in to continue your learning, track your applications and pick up where you left off.</p>

        <div className="auth-card">
          <div className="auth-tabs">
            <Link href="/sign-in" id="tabSignIn" className={signup ? "" : "active"}>Sign in</Link>
            <Link href="/sign-in?mode=signup" id="tabSignUp" className={signup ? "active" : ""}>Create account</Link>
          </div>
          <div id="clerkMount" className="auth-mount" aria-live="polite" hidden={failed}>
            {status === "loading" && <p className="auth-loading">Loading secure sign-in&hellip;</p>}
            {/* Clerk owns everything inside this div; React never renders children into it */}
            <div ref={mountRef}></div>
          </div>
          <div id="authFallback" className="auth-fallback" hidden={!failed}>
            <h3>Sign-in is unavailable right now</h3>
            <p>Please try again in a little while. If it keeps happening, reach us from the <Link href="/support">support page</Link>.</p>
            {isLocal && !clerkDomain() && (
              <p id="authDevNote" className="auth-dev">Developer note: set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> to your Clerk publishable key (see <code>lib/clerk.ts</code>).</p>
            )}
          </div>
        </div>
        <p className="auth-foot">By continuing you agree to our <Link href="/terms-and-conditions">Terms</Link> and <Link href="/privacy-policy">Privacy Policy</Link>.</p>
      </div>
    </section>
  );
}
