/* ==========================================================================
   aadyosh — Clerk authentication (loaded last on every page)

   Setup: in the Clerk dashboard open your application > API keys and copy the
   Publishable key (starts with pk_test_ or pk_live_). Paste it below - the
   Clerk domain is derived from the key, nothing else to configure. Then in
   Clerk > Configure > Paths / Domains, allow this site's address.

   What it does once configured
   - Header "Sign In" opens Clerk's sign-in form (a modal) on any page.
   - sign-in.html shows the same form inline, with a "Create account" tab.
   - When signed in, the header button becomes Clerk's avatar menu (sign out).
   While PUBLISHABLE_KEY is empty the header button just links to sign-in.html.
   ========================================================================== */
const CLERK_CONFIG = {
  PUBLISHABLE_KEY: "pk_test_ZG9taW5hbnQtZm9hbC0zNDQ5LmNsZXJrLmFjY291bnRzLmRldiQ",
};

(function () {
  const key = CLERK_CONFIG.PUBLISHABLE_KEY.trim();
  const mount = document.getElementById("clerkMount");
  const signInBtn = document.getElementById("signInBtn");

  /* Drop the placeholder click handlers other scripts attached to the button. */
  let btn = signInBtn;
  if (signInBtn) {
    btn = signInBtn.cloneNode(true);
    signInBtn.replaceWith(btn);
    btn.setAttribute("href", "sign-in.html");
  }

  const showFallback = () => {
    if (!mount) return;
    mount.hidden = true;
    const box = document.getElementById("authFallback");
    if (box) box.hidden = false;
    const dev = document.getElementById("authDevNote");
    if (dev && /^(localhost|127\.|\[::1\])/.test(location.hostname)) dev.hidden = false;
  };

  let domain = null;
  try {
    const m = /^pk_(?:test|live)_(.+)$/.exec(key);
    domain = m ? atob(m[1]).replace(/\$$/, "") : null;
  } catch (e) { /* malformed key */ }
  if (!domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(domain)) {
    if (key) console.warn("[aadyosh] CLERK_CONFIG.PUBLISHABLE_KEY does not look like a valid Clerk publishable key.");
    else console.info("[aadyosh] Clerk is not connected - set CLERK_CONFIG.PUBLISHABLE_KEY in assets/js/auth.js");
    showFallback();
    return;
  }

  const appearance = {
    variables: { colorPrimary: "#5f1fa3", borderRadius: "12px", fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' },
  };
  /* Inline form on sign-in.html only: it already sits inside our own card, so drop Clerk's card chrome.
     (Not applied to the modal, which needs its own solid background.) */
  const inlineAppearance = {
    ...appearance,
    elements: {
      rootBox: { width: "100%" },
      cardBox: { width: "100%", boxShadow: "none", border: "none", background: "transparent" },
      card: { boxShadow: "none", border: "none", background: "transparent" },
      footer: { background: "transparent" },
    },
  };
  let pendingOpen = false;

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (mount) { mount.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      if (window.Clerk && window.Clerk.loaded) window.Clerk.openSignIn({ appearance });
      else pendingOpen = true;
    });
  }

  function renderHeader() {
    const actions = document.querySelector(".nav-actions");
    if (!actions || !btn) return;
    let holder = document.getElementById("userButton");
    if (window.Clerk.user) {
      btn.style.display = "none";
      if (!holder) {
        holder = document.createElement("div");
        holder.id = "userButton";
        actions.prepend(holder);
        window.Clerk.mountUserButton(holder, { appearance, afterSignOutUrl: "index.html" });
      }
    } else {
      btn.style.display = "";
      if (holder) { window.Clerk.unmountUserButton(holder); holder.remove(); }
    }
  }

  function renderPageForm() {
    if (!mount) return;
    if (window.Clerk.user) { location.replace("index.html"); return; }
    const signup = new URLSearchParams(location.search).get("mode") === "signup";
    const opts = { appearance: inlineAppearance, routing: "virtual", signInUrl: "sign-in.html", signUpUrl: "sign-in.html?mode=signup", forceRedirectUrl: "index.html" };
    mount.innerHTML = "";
    if (signup) window.Clerk.mountSignUp(mount, opts); else window.Clerk.mountSignIn(mount, opts);
    document.getElementById("tabSignIn")?.classList.toggle("active", !signup);
    document.getElementById("tabSignUp")?.classList.toggle("active", signup);
    const t = document.getElementById("authTitle");
    if (t) t.textContent = signup ? "Create your account" : "Welcome back";
  }

  /* Loading pattern from Clerk's current JavaScript quickstart: the UI bundle (@clerk/ui) and the SDK
     (@clerk/clerk-js@6) are separate CDN scripts served from your Frontend API domain. */
  const addScript = (src, attrs) => new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = src;
    Object.keys(attrs || {}).forEach(k => s.setAttribute(k, attrs[k]));
    s.onload = resolve;
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });

  const timeout = setTimeout(() => { if (!(window.Clerk && window.Clerk.loaded)) showFallback(); }, 15000);
  (async () => {
    try {
      await addScript(`https://${domain}/npm/@clerk/ui@1/dist/ui.browser.js`);
      await addScript(`https://${domain}/npm/@clerk/clerk-js@6/dist/clerk.browser.js`, { "data-clerk-publishable-key": key });
      await window.Clerk.load({ ui: { ClerkUI: window.__internal_ClerkUICtor }, appearance });
    } catch (err) {
      console.error("[aadyosh] Clerk failed to load", err);
      clearTimeout(timeout);
      showFallback();
      return;
    }
    clearTimeout(timeout);
    renderHeader();
    renderPageForm();
    window.Clerk.addListener(renderHeader);
    if (pendingOpen && !window.Clerk.user) window.Clerk.openSignIn({ appearance });
  })();
})();
