import type { Metadata } from "next";
import Link from "next/link";
import { SupportFormCard } from "@/components/pages/SupportForm";

export const metadata: Metadata = {
  title: "Support",
  description: "Need help with aadyosh? Raise a support ticket or reach us directly — we route every request to the right team.",
};

export default function SupportPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>
            Need Help?{" "}
            <span className="highlight">Raise A Ticket</span>
            {" "}In Under A Minute.
          </h1>
          <p className="lead">Pick a topic, share the details, and we'll route your request to the right team.</p>
        </div>
      </section>
      <section className="amb-hero">
        <div className="container amb-hero-grid">
          <div className="contact-lane-card">
            <h3 style={{ fontSize: "19px", marginBottom: "6px" }}>Reach Us Directly</h3>
            <p style={{ color: "var(--ink-500)", fontSize: "13px", marginBottom: "8px" }}>Use the form for the fastest routing. Direct contact is best for urgent cases.</p>
            <div className="contact-lane-item">
              <div className="ic">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <div className="lbl">Email</div>
                <div className="val">hr@aadyosh.com</div>
              </div>
            </div>
            <div className="contact-lane-item">
              <div className="ic">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <div className="lbl">Phone</div>
                <div className="val">
                  <a href="tel:+917888209756" style={{ color: "inherit", textDecoration: "none" }}>+91 78882 09756</a>
                </div>
              </div>
            </div>
            <div className="contact-lane-item">
              <div className="ic">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <div className="lbl">Location</div>
                <div className="val">Aadyosh Corporate Private Limited, Anand Nagar, Nagpur</div>
              </div>
            </div>
            <p className="contact-lane-note">
              <i className="fa-solid fa-circle-info" style={{ color: "var(--brand-500)", marginRight: "6px" }}></i>
              Tip: choose the closest topic in the form for faster routing.
            </p>
          </div>
          <SupportFormCard />
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Looking For Quick Answers?</h2>
            <p>
              Browse our frequently asked questions on programs, pricing, certificates, and career support.
            </p>
            <div className="cta-actions">
              <Link href="/#faq" className="btn btn-dark">
                Browse FAQs{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
              {" "}
              <Link href="/" className="btn btn-ghost-light">Back to home</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
