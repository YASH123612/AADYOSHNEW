"use client";

/* Clerk (sign-in / sign-up) loader.

   Uses the browser bundles Clerk serves from your Frontend API domain, which is derived from the publishable key
   (so there is nothing else to configure). Set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY in Vercel / .env.local to use your
   own key; the default below is the development key the site shipped with (publishable keys are safe to expose).
   Before launch: create a production Clerk instance, add the site's domain there and switch to its pk_live_ key.
   The secret key (sk_...) is never used by this site and must never be committed. */

export const PUBLISHABLE_KEY = (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "pk_test_ZG9taW5hbnQtZm9hbC0zNDQ5LmNsZXJrLmFjY291bnRzLmRldiQ").trim();

export type ClerkAppearance = Record<string, unknown>;
export type ClerkLike = {
  loaded: boolean;
  user: unknown;
  load: (opts: Record<string, unknown>) => Promise<void>;
  openSignIn: (opts?: Record<string, unknown>) => void;
  mountSignIn: (el: HTMLElement, opts?: Record<string, unknown>) => void;
  mountSignUp: (el: HTMLElement, opts?: Record<string, unknown>) => void;
  unmountSignIn?: (el: HTMLElement) => void;
  unmountSignUp?: (el: HTMLElement) => void;
  mountUserButton: (el: HTMLElement, opts?: Record<string, unknown>) => void;
  unmountUserButton: (el: HTMLElement) => void;
  addListener: (cb: () => void) => () => void;
};

declare global {
  interface Window { Clerk?: ClerkLike; __internal_ClerkUICtor?: unknown }
}

export const appearance: ClerkAppearance = {
  variables: { colorPrimary: "#5f1fa3", borderRadius: "12px", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' },
};

/** Inline form on /sign-in: it already sits inside our own card, so drop Clerk's card chrome. */
export const inlineAppearance: ClerkAppearance = {
  ...appearance,
  elements: {
    rootBox: { width: "100%" },
    cardBox: { width: "100%", boxShadow: "none", border: "none", background: "transparent" },
    card: { boxShadow: "none", border: "none", background: "transparent" },
    footer: { background: "transparent" },
  },
};

/** The Frontend API domain is the base64 part of the publishable key. */
export function clerkDomain(key = PUBLISHABLE_KEY): string | null {
  try {
    const m = /^pk_(?:test|live)_(.+)$/.exec(key);
    const domain = m ? atob(m[1]).replace(/\$$/, "") : null;
    return domain && /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain) ? domain : null;
  } catch {
    return null;
  }
}

const addScript = (src: string, attrs: Record<string, string> = {}) =>
  new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = src;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });

let loading: Promise<ClerkLike> | null = null;

/** Loads the Clerk UI bundle + SDK once and resolves with the ready instance. */
export function loadClerk(): Promise<ClerkLike> {
  if (loading) return loading;
  loading = (async () => {
    const domain = clerkDomain();
    if (!domain) throw new Error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY does not look like a valid Clerk publishable key");
    if (!window.Clerk) {
      await addScript(`https://${domain}/npm/@clerk/ui@1/dist/ui.browser.js`);
      await addScript(`https://${domain}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, { "data-clerk-publishable-key": PUBLISHABLE_KEY });
    }
    const clerk = window.Clerk!;
    if (!clerk.loaded) await clerk.load({ ui: { ClerkUI: window.__internal_ClerkUICtor }, appearance });
    return clerk;
  })();
  loading.catch(() => { loading = null; });
  return loading;
}
