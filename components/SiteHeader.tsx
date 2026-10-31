"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CAT_LABEL, PROGRAMS, programHref, type Cat } from "@/lib/programs";
import { useAuth } from "@/components/auth/AuthProvider";
import { appearance } from "@/lib/clerk";

const CAT_ICON: Record<Cat, string> = {
  cs: "fa-solid fa-code", ee: "fa-solid fa-bolt", mech: "fa-solid fa-gears",
  civil: "fa-solid fa-drafting-compass", mgmt: "fa-solid fa-briefcase", health: "fa-solid fa-heart-pulse",
};
const MENU_CATS: Cat[] = ["cs", "civil", "mgmt"];
/* The Campus Ambassador page is kept exactly as it was before the move to Next.js (owner's standing instruction),
   including its original header menu: all six domains, a Copilot link and the older tagline. */
const FROZEN_PATH = "/campus-ambassador";
const FROZEN_MENU_CATS: Cat[] = ["cs", "ee", "mech", "civil", "mgmt", "health"];

const NAV = [
  { href: "/features", label: "Features" },
  { href: "/campus-ambassador", label: "Campus Ambassador" },
  { href: "/reviews", label: "Reviews" },
  { href: "/careers", label: "Careers" },
  { href: "/support", label: "Support" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const frozen = pathname === FROZEN_PATH;
  const cats = frozen ? FROZEN_MENU_CATS : MENU_CATS;

  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cat, setCat] = useState<Cat>("cs");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { status, signedIn, clerk, openSignIn } = useAuth();
  const userButtonRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);

  // close menus when navigating
  useEffect(() => { setProgramsOpen(false); setMobileOpen(false); }, [pathname]);
  // click anywhere else closes the programs menu
  useEffect(() => {
    const close = (e: MouseEvent) => { if (!programsRef.current?.contains(e.target as Node)) setProgramsOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  // when signed in, Clerk draws its avatar menu into the header
  useEffect(() => {
    const holder = userButtonRef.current;
    if (!signedIn || !clerk || !holder) return;
    clerk.mountUserButton(holder, { appearance, afterSignOutUrl: "/" });
    return () => clerk.unmountUserButton(holder);
  }, [signedIn, clerk]);

  const isDesktop = () => !window.matchMedia("(max-width: 980px)").matches;
  const onSignIn = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (status === "failed") return;                       // let the link open /sign-in, which explains what is wrong
    e.preventDefault();
    const mount = document.getElementById("clerkMount");
    if (mount) { mount.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    openSignIn();
  };

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="logo">
          <img className="logo-mark-img" src="/assets/img/logo-mark.png" alt="" />
          <img className="logo-word-img" src="/assets/img/logo-wordmark.png" alt="aadyosh" />
        </Link>

        <nav className={"nav-links" + (mobileOpen ? " open" : "")} id="navLinks">
          <div
            ref={programsRef}
            className={"nav-item" + (programsOpen ? " open" : "")}
            onMouseEnter={() => { if (!isDesktop()) return; if (closeTimer.current) clearTimeout(closeTimer.current); setProgramsOpen(true); }}
            onMouseLeave={() => { if (!isDesktop()) return; closeTimer.current = setTimeout(() => setProgramsOpen(false), 150); }}
          >
            <button className="nav-link" onClick={() => setProgramsOpen((o) => !o)}>
              Programs <i className="fa-solid fa-chevron-down chev" aria-hidden="true"></i>
            </button>
            <div className="mega">
              <div className="mega-tabs">
                {cats.map((c) => (
                  <button key={c} className={"mega-tab" + (cat === c ? " active" : "")} onClick={() => setCat(c)}>
                    <i className={CAT_ICON[c]}></i>{CAT_LABEL[c]} <span className="count">{PROGRAMS[c].length}</span>
                  </button>
                ))}
              </div>
              <div className="mega-grid">
                {(PROGRAMS[cats.includes(cat) ? cat : cats[0]]).map((p) => (
                  <Link key={p.title} className="mega-card show" href={programHref(p.title)}>
                    <div className="mega-card-icon"><i className={p.icon} aria-hidden="true"></i></div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                      <div className="mega-tags"><span>Certificate</span><span>Mentor-led</span></div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mega-footer">
                <span style={{ fontSize: 12.5, color: "var(--ink-500)", fontWeight: 600 }}>
                  {frozen ? "Real projects · Rubric evaluation · Career outcomes" : "Real projects · Mentor reviews · Career outcomes"}
                </span>
                <Link href="/#programs" className="btn btn-primary btn-sm">Explore all programs</Link>
              </div>
            </div>
          </div>

          {NAV.map((n) => (
            <Fragment key={n.href}>
              {frozen && n.href === "/campus-ambassador" && (
                <Link className="nav-link" href="/copilot">
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ color: "var(--brand-500)" }} aria-hidden="true"></i> Copilot
                </Link>
              )}
              <Link className={"nav-link" + (pathname === n.href ? " active" : "")} href={n.href}>{n.label}</Link>
            </Fragment>
          ))}
        </nav>

        <div className="nav-actions">
          {signedIn ? <div id="userButton" ref={userButtonRef}></div> : (
            <a href="/sign-in" className="btn btn-primary btn-sm" id="signInBtn" onClick={onSignIn}>
              <span className="label-full">Sign In</span> <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 11 }}></i>
            </a>
          )}
          <button
            className="mobile-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="navLinks"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <i className={mobileOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </header>
  );
}
