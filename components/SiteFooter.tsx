"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/content";

export function SiteFooter() {
  const frozen = usePathname() === "/campus-ambassador";   // that page keeps its original "Return Policy" label

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="logo">
              <img className="logo-mark-img" src="/assets/img/logo-mark.png" alt="" />
              <img className="logo-word-img footer-word" src="/assets/img/logo-wordmark.png" alt="aadyosh" />
            </Link>
            <p>aadyosh helps ambitious learners upskill through mentor-led sessions, portfolio-grade projects, and outcomes built for hiring teams.</p>
            <div className="footer-tags"><span>CIN: {SITE.cin}</span><span>GSTIN: {SITE.gstin}</span></div>
          </div>
          <div className="footer-col">
            <h5>Who we are</h5>
            <ul>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/reviews">Reviews</Link></li>
              <li><Link href="/campus-ambassador">Campus Ambassador</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Quick links</h5>
            <ul>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/refund-policy">Refunds</Link></li>
              <li><Link href="/return-policy">{frozen ? "Return Policy" : "Program Changes"}</Link></li>
              <li><Link href="/terms-and-conditions">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact us</h5>
            <ul className="footer-contact">
              <li><i className="fa-solid fa-envelope"></i><div><div className="lbl">Email</div><div className="val">{SITE.email}</div></div></li>
              <li><i className="fa-solid fa-phone"></i><div><div className="lbl">Phone</div><div className="val"><a href={SITE.phoneHref} style={{ color: "inherit", textDecoration: "none" }}>{SITE.phoneDisplay}</a></div></div></li>
              <li><i className="fa-solid fa-location-dot"></i><div><div className="lbl">Office</div><div className="val">{SITE.office}</div></div></li>
            </ul>
            <div className="footer-social">
              <a href={SITE.social.instagram} rel="noopener noreferrer" aria-label="aadyosh on Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href={SITE.social.linkedin} rel="noopener noreferrer" aria-label="aadyosh on LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href={SITE.social.youtube} rel="noopener noreferrer" aria-label="aadyosh on YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> aadyosh. All rights reserved.</span>
          <div className="links"><a href="#">Sitemap</a><Link href="/terms-and-conditions">Terms</Link><Link href="/privacy-policy">Privacy</Link></div>
        </div>
      </div>
    </footer>
  );
}
