import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BatchCountdown, BatchLabel } from "@/components/BatchContext";
import { MentorLink } from "@/components/modals/ModalProvider";
import { Accordion } from "@/components/Accordion";
import { Curriculum } from "@/components/program/Curriculum";
import { ALL_PROGRAMS, findCatalogEntry } from "@/lib/programs";
import { getProgram } from "@/lib/program";
import { projectsFor } from "@/lib/projects";
import { SITE } from "@/lib/content";

type Params = { slug: string };

export const dynamicParams = true;
export function generateStaticParams(): Params[] {
  return [{ slug: "artificial-intelligence" }, ...ALL_PROGRAMS.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  if (!findCatalogEntry(slug)) return { title: "Program not found" };
  const p = getProgram(slug);
  return { title: p.title, description: p.desc };
}

const PARTNER_NAMES = ["Nexora", "Vantage Cloud", "Meridian Tech", "Orbital Data", "Solvix"];
const FEATURES = [
  "Mentor-led live cohort", "Guaranteed internship", "2 real-world projects", "Resume + LinkedIn positioning", "Pre-placement orientation",
  "Industry-style assignments", "Doubt support (48h SLA)", "6-month recordings access", "Placement support until placed", "LMS access until placed",
  "1-on-1 mock interviews", "Curated assessment tests", "Machine coding rounds", "Weekly review + feedback loop",
];

export default async function ProgramPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = findCatalogEntry(slug);
  if (!entry) notFound();                       // e.g. an old link to a program that was removed
  const data = getProgram(slug);
  const domain = entry.domain;
  const tracks = projectsFor(slug);
  const projects = tracks.length
    ? tracks
    : data.projects.map((p) => ({ slug, level: "Blueprint", title: p.title, desc: p.desc, tools: [] as string[] }));

  return (
    <>
      {/* ================= PROGRAM HERO ================= */}
      <section className="prog-hero">
        <div className="container hero-grid">
          <div>
            <span className="prog-badge">{data.badge}</span>
            <h1>{data.title}</h1>
            <p className="desc">{data.desc}</p>

            <div className="mentor-line"><i className="fa-solid fa-user-check" aria-hidden="true" style={{ color: "var(--brand-600)" }}></i> Reviewed by mentors from teams at:</div>
            <div className="mentor-logos">{PARTNER_NAMES.map((n) => <span key={n}>{n}</span>)}</div>

            <div className="info-tile-row">
              {data.tiles.map((t) => (
                <div key={t.lbl} className="info-tile">
                  <div className="lbl"><i className={t.ic} aria-hidden="true"></i> {t.lbl}</div>
                  <div className="val">{t.val}</div>
                </div>
              ))}
            </div>

            <div className="prog-cta-row">
              <MentorLink program={data.title} domain={domain} className="btn btn-primary"><i className="fa-solid fa-phone-volume"></i> Talk to a Mentor</MentorLink>
              <a href="#curriculum" className="btn btn-outline">View curriculum <i className="fa-solid fa-chevron-right" style={{ fontSize: 11 }}></i></a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit"></div>
            <div className="orbit o2"></div>
            <div className="orbit-core" style={{ fontSize: 44, color: "var(--white)" }}><i className={data.icon}></i></div>
            {(data.orbitIcons ?? []).slice(0, 7).map((ic, i) => (
              <div key={i} className={`orbit-icon oi-${i + 1}`}><i className={ic} aria-hidden="true"></i></div>
            ))}

            <div className="float-badge fb-1"><div className="ic"><i className="fa-solid fa-users" aria-hidden="true"></i></div><div><b>{data.stats.enrolled}</b><span>Enrolled learners</span></div></div>
            <div className="float-badge fb-2"><div className="ic ic-accent"><i className="fa-solid fa-star" aria-hidden="true"></i></div><div><b>{data.stats.rating}</b><span>{data.stats.reviews}</span></div></div>
            <div className="float-badge fb-3"><div className="ic ic-dark"><i className="fa-solid fa-user-tie" aria-hidden="true"></i></div><div><b>Industry mentors</b><span>Weekly live sessions</span></div></div>

            <div className="batch-pill">
              <span className="pill-icon"><i className="fa-regular fa-clock"></i></span>
              <span><span className="pill-label">Next batch: </span><BatchLabel /></span>
              <span className="pill-dot"></span>
              <span>Starts in <BatchCountdown className="pill-days" /></span>
              <span className="pill-dot"></span>
              <span className="pill-accent">{data.stats.seats}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <section className="programs" id="curriculum">
        <Curriculum modules={data.modules} />
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="projects" id="projects" style={{ background: "var(--ink-50)" }}>
        <div className="container">
          <div className="section-head center">
            <h2>Projects Built For <span className="highlight">Hiring Decisions</span></h2>
            <p>Structured blueprints with real tools, and real deliverables for this track.</p>
          </div>
          <div className="proj-grid proj-grid-3">
            {projects.map((p, i) => (
              <div key={p.title} className="proj-card">
                <div className="proj-top"><div className="num">{String(i + 1).padStart(2, "0")}</div><span className={`proj-level lvl-${p.level.toLowerCase()}`}>{p.level}</span></div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                {p.tools.length > 0 && <div className="proj-tools">{p.tools.map((t) => <span key={t}>{t}</span>)}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="pricing">
        <div className="container">
          <div className="section-head center">
            <h2>Simple Pricing. <span className="highlight">Proven Outcomes.</span></h2>
            <p>Batch-limited seats. Full pricing confirmed on a quick screening call.</p>
          </div>
          <div className="price-grid price-grid-one">
            <div className="price-card popular">
              <span className="ribbon">This track</span>
              <span className="plan-name">Fellowship</span>
              <div className="price"><span className="now">₹10,000</span></div>
              <div className="batch-row">
                <span className="batch-tag"><i className="fa-regular fa-clock"></i> Next batch: <BatchLabel /></span>
                <span className="batch-tag limited"><i className="fa-solid fa-bolt"></i> Limited seats</span>
              </div>
              <div className="price-actions">
                <a href={SITE.enrollUrl} rel="noopener" className="btn btn-outline btn-block">Enroll now</a>
                <MentorLink program={data.title} domain={domain} className="btn btn-primary btn-block"><i className="fa-solid fa-phone-volume"></i> Talk to a Mentor</MentorLink>
              </div>
              <p className="price-note">Full pricing details confirmed on a quick screening call.</p>
              <div className="whatget">What you get</div>
              <ul className="feat-cols">
                {FEATURES.map((f) => <li key={f}><i className="fa-solid fa-check"></i> {f}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq">
        <div className="container">
          <div className="section-head center">
            <h2 style={{ color: "#fff", margin: "18px 0 30px" }}>About This <span style={{ color: "var(--brand-300)" }}>Program</span></h2>
          </div>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <Accordion id="progFaq" items={data.faqs.map((f) => ({ icon: "fa-solid fa-circle-question", q: f.q, a: f.a }))} />
          </div>
        </div>
      </section>
    </>
  );
}
