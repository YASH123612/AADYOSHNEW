"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { appearance, loadClerk, type ClerkLike } from "@/lib/clerk";

type AuthState = {
  status: "loading" | "ready" | "failed";
  signedIn: boolean;
  clerk: ClerkLike | null;
  /** Open Clerk's sign-in modal (waits for Clerk to finish loading if it has not yet). */
  openSignIn: () => void;
};
const AuthCtx = createContext<AuthState | null>(null);

export function useAuth(): AuthState {
  const a = useContext(AuthCtx);
  if (!a) throw new Error("useAuth must be used inside <AuthProvider>");
  return a;
}

/** Loads Clerk on every page and tracks whether a visitor is signed in. */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthState["status"]>("loading");
  const [signedIn, setSignedIn] = useState(false);
  const [clerk, setClerk] = useState<ClerkLike | null>(null);
  const clerkRef = useRef<ClerkLike | null>(null);
  const pendingOpen = useRef(false);

  useEffect(() => {
    let off: (() => void) | undefined;
    let cancelled = false;
    const timeout = setTimeout(() => { if (!clerkRef.current) setStatus("failed"); }, 15000);
    loadClerk()
      .then((c) => {
        if (cancelled) return;
        clearTimeout(timeout);
        clerkRef.current = c;
        setClerk(c);
        setSignedIn(!!c.user);
        setStatus("ready");
        off = c.addListener(() => setSignedIn(!!c.user));
        if (pendingOpen.current && !c.user) c.openSignIn({ appearance });
        pendingOpen.current = false;
      })
      .catch((err) => { console.error("[aadyosh] Clerk failed to load", err); clearTimeout(timeout); if (!cancelled) setStatus("failed"); });
    return () => { cancelled = true; clearTimeout(timeout); off?.(); };
  }, []);

  const openSignIn = useCallback(() => {
    const clerk = clerkRef.current;
    if (clerk) clerk.openSignIn({ appearance });
    else pendingOpen.current = true;
  }, []);

  return <AuthCtx.Provider value={{ status, signedIn, clerk, openSignIn }}>{children}</AuthCtx.Provider>;
}
