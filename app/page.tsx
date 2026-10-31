import Link from "next/link";
import { HeroSearch } from "@/components/home/HeroSearch";
import { MentorLogoTrack, LogoGrid, TechMarquee } from "@/components/home/LogoRows";
import { Stepper, ProgramTabs, CertPreview, ReviewGrid, FaqList } from "@/components/home/Sections";
import { ProjectsExplorer } from "@/components/home/ProjectsExplorer";
import { BatchLabel, BatchCountdown } from "@/components/BatchContext";
import { TalkLink } from "@/components/modals/ModalProvider";

export default function IndexPage() {
  return (
    <>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <h1>
              Career-Ready Skills, Built With{" "}
              <span className="highlight">Real Mentors.</span>
            </h1>
            <p className="hero-sub">
              Live cohorts led by working professionals, hands-on projects, guided internships, and placement support — backed by an AI-powered learning copilot and mobile app.
            </p>
            <HeroSearch />
            <div className="hero-actions">
              <a href="#programs" className="btn btn-accent btn-lg">
                Choose My Domain{" "}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
              {" "}
              <a href="#how" className="watch-link">
                <span className="play-dot">
                  <i className="fa-solid fa-play"></i>
                </span>
                {" "}Watch how it works
              </a>
            </div>
            <ul className="trust-row">
              <li>
                <i className="fa-solid fa-circle-check"></i>
                {" "}Mentor-led cohorts
              </li>
              <li>
                <i className="fa-solid fa-briefcase"></i>
                {" "}Internship + projects
              </li>
              <li>
                <i className="fa-solid fa-handshake"></i>
                {" "}Placement support
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="orbit"></div>
            <div className="orbit o2"></div>
            <div className="orbit-core">
              <img src="/assets/img/logo-mark.png" alt="" />
              {" "}
              <b>aadyosh</b>
              {" "}
              <span>6 tracks live</span>
            </div>
            <div className="orbit-tags">
              <div className="orbit-tag-slot" style={{ transform: "rotate(0deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(0deg)" }}>
                      <span className="dot" style={{ background: "#5B21B6" }}></span>
                      Python
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(51deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-51deg)" }}>
                      <span className="dot" style={{ background: "var(--accent-500)" }}></span>
                      AWS Cloud
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(103deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-103deg)" }}>
                      <span className="dot" style={{ background: "#2563eb" }}></span>
                      UI/UX
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(154deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-154deg)" }}>
                      <span className="dot" style={{ background: "#db2777" }}></span>
                      Cyber Security
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(206deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-206deg)" }}>
                      <span className="dot" style={{ background: "#16a34a" }}></span>
                      DevOps
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(257deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-257deg)" }}>
                      <span className="dot" style={{ background: "var(--brand-600)" }}></span>
                      Data Science
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-tag-slot" style={{ transform: "rotate(309deg)" }}>
                <div className="orbit-tag-arm">
                  <div className="orbit-tag-counter">
                    <div className="orbit-tag" style={{ transform: "rotate(-309deg)" }}>
                      <span className="dot" style={{ background: "#7c3aed" }}></span>
                      Java
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="orbit-ics">
              <div className="orbit-ic-slot" style={{ transform: "rotate(28deg)" }}>
                <div className="orbit-ic-arm">
                  <div className="orbit-ic-counter">
                    <div className="orbit-ic" style={{ transform: "rotate(-28deg)" }}>
                      <i className="fa-solid fa-code"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-ic-slot" style={{ transform: "rotate(118deg)" }}>
                <div className="orbit-ic-arm">
                  <div className="orbit-ic-counter">
                    <div className="orbit-ic" style={{ transform: "rotate(-118deg)" }}>
                      <i className="fa-solid fa-chart-line"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-ic-slot" style={{ transform: "rotate(208deg)" }}>
                <div className="orbit-ic-arm">
                  <div className="orbit-ic-counter">
                    <div className="orbit-ic" style={{ transform: "rotate(-208deg)" }}>
                      <i className="fa-solid fa-palette"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="orbit-ic-slot" style={{ transform: "rotate(298deg)" }}>
                <div className="orbit-ic-arm">
                  <div className="orbit-ic-counter">
                    <div className="orbit-ic" style={{ transform: "rotate(-298deg)" }}>
                      <i className="fa-solid fa-server"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-badge fb-1">
              <div className="ic">
                <i className="fa-solid fa-user-graduate"></i>
              </div>
              <div>
                <b>2,400+</b>
                <span>Active learners</span>
              </div>
            </div>
            <div className="float-badge fb-2">
              <div className="ic ic-accent">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <b>92%</b>
                <span>Cohort completion</span>
              </div>
            </div>
            <div className="float-badge fb-3">
              <div className="ic ic-dark">
                <i className="fa-solid fa-user-check"></i>
              </div>
              <div>
                <b>Mentor reviewed</b>
                <span>Every project</span>
              </div>
            </div>
            <div className="batch-pill">
              <span className="pill-icon">
                <i className="fa-regular fa-clock"></i>
              </span>
              {" "}
              <span>
                <span className="pill-label">Next batch:{" "}</span>
                <BatchLabel />
              </span>
              {" "}
              <span className="pill-dot"></span>
              {" "}
              <span>
                Starts in{" "}
                <BatchCountdown className="pill-days" />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="partners" id="mentors">
        <div className="container">
          <div className="section-head center" style={{ marginTop: "16px" }}>
            <h2>
              Learn From The{" "}
              <span className="highlight">Top 1% In The Industry</span>
            </h2>
            <p>
              Mentorship led by experienced engineers from top product and services companies — not instructors reading slides.
            </p>
          </div>
          <p className="partner-note">
            Sample mentor-background marks shown below — replace with aadyosh's confirmed mentor network.
          </p>
          <div className="logo-marquee">
            <MentorLogoTrack />
          </div>
        </div>
      </section>
      <section className="partners">
        <div className="container">
          <div className="section-head center" style={{ marginTop: "16px" }}>
            <h2>
              Our{" "}
              <span className="highlight">Hiring Network</span>
            </h2>
            <p>Get placement support and referrals through our growing network of hiring partners.</p>
          </div>
          <div className="partner-spot">
            <span className="dot"></span>
            {" "}Official Placement Partner
          </div>
          <div className="partner-featured">
            <i className="fa-solid fa-circle-nodes"></i>
            {" "}HireLoop
          </div>
          <p className="partner-note">Sample partner marks shown below — replace with aadyosh's confirmed hiring partners.</p>
          <LogoGrid />
        </div>
      </section>
      <section className="partners" id="tech-stack">
        <div className="container">
          <div className="section-head center" style={{ marginTop: "16px" }}>
            <h2>
              Tools You'll{" "}
              <span className="highlight">Learn To Use</span>
            </h2>
            <p>Every track is built around the tools hiring teams actually ask for.</p>
          </div>
        </div>
        <TechMarquee />
      </section>
      <section className="how" id="how">
        <div className="container">
          <div className="section-head center">
            <h2>
              From Sign-Up To{" "}
              <span className="highlight">First Class</span>
              {" "}In 5 Steps
            </h2>
            <p>A guided path that gets you from curious to enrolled without the guesswork.</p>
          </div>
          <Stepper />
        </div>
      </section>
      <section className="outcomes" id="outcomes">
        <div className="container">
          <h2>
            Internships That Turn Into{" "}
            <span style={{ color: "var(--brand-300)" }}>Real Offers.</span>
          </h2>
          <p className="hero-sub">
            Structured projects, honest reviews, and interview practice that actually converts rounds.
          </p>
          <TalkLink href="#faq" className="btn btn-ghost-light">
            <i className="fa-solid fa-phone-volume"></i>
            {" "}Talk to a Mentor
          </TalkLink>
          <div className="convert-grid">
            <div className="convert-card">
              <i className="fa-solid fa-diagram-project"></i>
              <h4>Portfolio-grade projects</h4>
              <p>Ship 2–3 real deliverables reviewed by working mentors, not just attendance.</p>
            </div>
            <div className="convert-card">
              <i className="fa-solid fa-comments"></i>
              <h4>1-on-1 mock interviews</h4>
              <p>Practice with structured feedback so weak spots get fixed before the real round.</p>
            </div>
            <div className="convert-card">
              <i className="fa-solid fa-file-signature"></i>
              <h4>Resume & profile reviews</h4>
              <p>Get your resume and LinkedIn positioned around what recruiters actually scan for.</p>
            </div>
            <div className="convert-card">
              <i className="fa-solid fa-people-arrows"></i>
              <h4>Warm referral support</h4>
              <p>Tap into mentor and alumni referrals across our hiring network when you're ready.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="programs" id="programs">
        <div className="container">
          <div className="section-head">
            <h2>
              Pick A Track, See The{" "}
              <span className="highlight">Full Curriculum</span>
            </h2>
            <p>Every program ships with real projects, mentor reviews, and a completion certificate.</p>
          </div>
          <ProgramTabs />
          <div className="programs-cta">
            <TalkLink href="#faq" className="btn btn-primary">
              <i className="fa-solid fa-phone-volume"></i>
              {" "}Talk to a Mentor
            </TalkLink>
            {" "}
            <a href="#certification" className="btn btn-outline">
              See certificates{" "}
              <i className="fa-solid fa-chevron-right" style={{ fontSize: "11px" }}></i>
            </a>
          </div>
        </div>
      </section>
      <section className="projects" id="projects">
        <div className="container">
          <div className="section-head center">
            <h2>
              Projects Built For{" "}
              <span className="highlight">Hiring Decisions</span>
            </h2>
            <p>Structured blueprints with real tools, real deliverables, and work you can show.</p>
          </div>
          <ProjectsExplorer />
        </div>
      </section>
      <section className="certify" id="certification">
        <div className="container certify-grid">
          <div>
            <h2 style={{ margin: "18px 0 14px" }}>
              Get Certified.{" "}
              <span className="highlight">Get Noticed.</span>
            </h2>
            <p style={{ color: "var(--ink-500)", fontSize: "16px" }}>
              Every certificate is tied to real deliverables and mentor sign-off — built to be checked, not just displayed.
            </p>
            <div className="pill-row">
              <span>
                <i className="fa-solid fa-user-check"></i>
                {" "}Mentor-reviewed
              </span>
              {" "}
              <span>
                <i className="fa-solid fa-share-nodes"></i>
                {" "}Shareable proof
              </span>
            </div>
            <div className="feat-row">
              <div className="ic">
                <i className="fa-solid fa-medal"></i>
              </div>
              <div>
                <h4>Outcome-based credential</h4>
                <p>Issued after mentor review — not simply for showing up.</p>
              </div>
            </div>
            <div className="feat-row">
              <div className="ic">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <div>
                <h4>Built for hiring conversations</h4>
                <p>Signals proof-of-work and consistency, in a format recruiters can skim fast.</p>
              </div>
            </div>
            <div className="feat-row">
              <div className="ic">
                <i className="fa-solid fa-share-from-square"></i>
              </div>
              <div>
                <h4>Clean & shareable</h4>
                <p>Fits your resume and LinkedIn, and looks sharp across devices.</p>
              </div>
            </div>
            <div className="certify-actions">
              <TalkLink href="#faq" className="btn btn-primary">
                <i className="fa-solid fa-phone-volume"></i>
                {" "}Talk to a Mentor
              </TalkLink>
              {" "}
              <a href="#reviews" className="btn btn-outline">
                See reviews{" "}
                <i className="fa-solid fa-chevron-right" style={{ fontSize: "11px" }}></i>
              </a>
            </div>
          </div>
          <CertPreview />
        </div>
      </section>
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-head center">
            <h2>
              Choose The Plan That{" "}
              <span className="highlight">Fits Your Goal</span>
            </h2>
            <p>Batch-limited seats. Prices shown are illustrative starting points.</p>
          </div>
          <div className="price-grid price-grid-one">
            <div className="price-card popular">
              <span className="ribbon">Most popular</span>
              {" "}
              <span className="plan-name">Fellowship</span>
              <div className="price">
                <span className="now">₹10,000</span>
              </div>
              <div className="batch-row">
                <span className="batch-tag">
                  <i className="fa-regular fa-clock"></i>
                  {" "}Next batch:{" "}
                  <BatchLabel />
                </span>
                {" "}
                <span className="batch-tag limited">
                  <i className="fa-solid fa-bolt"></i>
                  {" "}Limited seats
                </span>
              </div>
              <div className="price-actions">
                <a href="https://payments.cashfree.com/forms/AADYOSH" rel="noopener" className="btn btn-outline btn-block">Enroll now</a>
                {" "}
                <TalkLink href="#faq" className="btn btn-primary btn-block">
                  <i className="fa-solid fa-phone-volume"></i>
                  {" "}Talk to a Mentor
                </TalkLink>
              </div>
              <p className="price-note">Full pricing details confirmed on a quick screening call.</p>
              <div className="whatget">What you get</div>
              <ul className="feat-cols">
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Mentor-led live cohort
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Guaranteed internship
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}2 real-world projects
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Resume + LinkedIn positioning
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Pre-placement orientation
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Industry-style assignments
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Doubt support (48h SLA)
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}6-month recordings access
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Placement support until placed
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}LMS access until placed
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}1-on-1 mock interviews
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Curated assessment tests
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Machine coding rounds
                </li>
                <li>
                  <i className="fa-solid fa-check"></i>
                  {" "}Weekly review + feedback loop
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-head center">
            <h2>
              What Learners Say About{" "}
              <span className="highlight">aadyosh</span>
            </h2>
            <p>Illustrative reviews — swap in your real testimonials once you start collecting them.</p>
          </div>
          <ReviewGrid />
        </div>
      </section>
      <section className="how" id="ambassador">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="section-head center" style={{ marginTop: "16px" }}>
            <h2>
              Represent{" "}
              <span className="highlight">aadyosh</span>
              {" "}On Your Campus
            </h2>
            <p>
              Help students on your campus discover mentor-led learning, and earn rewards, certificates, and referral perks along the way.
            </p>
          </div>
          <Link href="/campus-ambassador" className="btn btn-primary">
            <i className="fa-solid fa-user-plus"></i>
            {" "}Apply to be an Ambassador
          </Link>
        </div>
      </section>
      <section className="faq" id="faq">
        <div className="container faq-grid">
          <div>
            <h2 style={{ color: "#fff", margin: "18px 0 14px" }}>
              Questions &{" "}
              <span style={{ color: "var(--brand-300)" }}>Answers</span>
            </h2>
            <p style={{ color: "var(--ink-300)", fontSize: "16px" }}>
              Clear answers on programs, projects, certificates, and career support — so you can choose the right track with confidence.
            </p>
            <div className="faq-tag-row">
              <span>Mentor-led cohorts</span>
              {" "}
              <span>Portfolio-grade projects</span>
              {" "}
              <span>6-month content access</span>
            </div>
            <div className="faq-contact">
              <TalkLink href="#faq" id="faqTalkToMentor">
                <i className="fa-solid fa-phone"></i>
                {" "}Talk to a Mentor
              </TalkLink>
              {" "}
              <a href="mailto:hr@aadyosh.com">
                <i className="fa-solid fa-envelope"></i>
                {" "}hr@aadyosh.com
              </a>
            </div>
          </div>
          <FaqList />
        </div>
      </section>
      <section className="cta-banner">
        <div className="container">
          <div className="cta-box">
            <h2>Ready For A Real Upskilling Journey?</h2>
            <p>
              You'll train on real projects, learn how to position your work, and get evaluated through a structured mentor program.
            </p>
            <div className="cta-actions">
              <TalkLink href="#faq" className="btn btn-dark">
                <i className="fa-solid fa-phone-volume"></i>
                {" "}Talk to a Mentor
              </TalkLink>
              {" "}
              <Link href="/support" className="btn btn-ghost-light">
                <i className="fa-solid fa-shield-halved"></i>
                {" "}Need support?
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="app-band">
        <div className="container app-band-inner">
          <div>
            <h3>Learn on the go with the aadyosh app.</h3>
            <p>
              Join live classes, track your progress, and chat with your mentor from anywhere. Coming soon on Android and iOS.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <span className="store-btn">
              <i className="fa-brands fa-android"></i>
              <span className="lines">
                <small>Coming soon on</small>
                Google Play
              </span>
            </span>
            {" "}
            <span className="store-btn">
              <i className="fa-brands fa-apple"></i>
              <span className="lines">
                <small>Coming soon on</small>
                App Store
              </span>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
