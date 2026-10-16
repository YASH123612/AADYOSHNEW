/* ==========================================================================
   aadyosh — data
   PROGRAMS, CAT_LABEL, slugify, and the mega-menu/program-grid renderers now
   live in programs-data.js (loaded before this file) so every page can use
   the same "Programs" dropdown, not just the homepage.
   ========================================================================== */
const PROJECTS = [
  { kind: "Blueprint", title: "Portfolio Website Build", desc: "Design and ship a personal portfolio with a live deploy." },
  { kind: "Blueprint", title: "Data Dashboard", desc: "Turn a messy dataset into a clean, interactive dashboard." },
  { kind: "Blueprint", title: "REST API Service", desc: "Build and document a production-style backend API." },
  { kind: "Blueprint", title: "Mobile App MVP", desc: "Ship a minimal, functioning mobile app end-to-end." },
  { kind: "Blueprint", title: "ML Prediction Model", desc: "Train, evaluate, and explain a simple prediction model." },
  { kind: "Blueprint", title: "Cloud Deployment Pipeline", desc: "Set up CI/CD for a small app on a cloud provider." },
  { kind: "Blueprint", title: "Security Audit Report", desc: "Assess a sample app and document real vulnerabilities." },
  { kind: "Blueprint", title: "Brand Case Study", desc: "Plan and present a mini go-to-market case study." },
];

const REVIEWS = [
  { name: "Aarav M.", role: "Frontend Engineer Trainee", quote: "The mentor feedback loop made the biggest difference — every project review pointed at something specific to fix." },
  { name: "Sneha K.", role: "Cloud Program Learner", quote: "Structured, no fluff. I liked that certificates were tied to actual deliverables instead of just finishing videos." },
  { name: "Rohit P.", role: "Career Switcher", quote: "Mock interviews were the most useful part for me — I walked into real interviews far less nervous." },
];

const FAQS = [
  { tag: "Overview", icon: "fa-solid fa-circle-info", q: "What is aadyosh, in one line?", a: "Outcome-first training with mentor-led cohorts and internship-style projects, built to produce portfolio proof and interview readiness — not just course completion." },
  { tag: "Mentors", icon: "fa-solid fa-user-check", q: "Who are the mentors?", a: "Working professionals from relevant fields who review your deliverables and run live sessions, not pre-recorded narrators." },
  { tag: "Beginner", icon: "fa-solid fa-seedling", q: "Is this beginner friendly?", a: "Yes. You start fundamentals-first, then move into structured projects with checkpoints and clear guidance on what to build." },
  { tag: "Projects", icon: "fa-regular fa-file-lines", q: "What do I actually build?", a: "Two to three real-world projects per track, reviewed against a rubric, so you finish with something you can show — not just a transcript." },
  { tag: "Certificate", icon: "fa-solid fa-award", q: "Do you provide a certificate?", a: "Yes — a training or internship certificate issued after your deliverables pass mentor review, not simply for attending sessions." },
  { tag: "Hiring", icon: "fa-solid fa-briefcase", q: "What does placement support mean here?", a: "Resume and profile reviews, mock interviews, and warm introductions through our hiring network once you're ready." },
  { tag: "Access", icon: "fa-regular fa-clock", q: "How long do I get access to content?", a: "Recordings and materials stay available for a year so you can revisit, refine projects, and prep properly for interviews." },
];

/* ==========================================================================
   Partner logo grid (placeholder marks)
   ========================================================================== */
const PARTNER_NAMES = ["Nexora", "Verdant Labs", "Bluepeak", "Cirrus Works", "Solvix", "Meridian Tech", "Vantage Cloud", "Orbital Data", "Northfield Digital", "Quanta Systems"];
document.getElementById("logoGrid").innerHTML = PARTNER_NAMES.map(n => `<div class="logo-tile">${n}</div>`).join("");

/* Placeholder names. To show a REAL company here, replace its entry with an object, e.g.
     { name: "Acme Corp", logo: "assets/img/mentors/acme.svg" }
   and save the logo file in assets/img/mentors/. Only do this for companies where your mentors really work
   (and you have permission to use the mark) - otherwise it misleads visitors. Plain strings render as text tiles. */
const MENTOR_BG_NAMES = ["TechCorp", "Cloudify", "DataSphere", "PixelWorks", "ScaleUp Labs", "ByteForge", "Nimbus Systems", "Corestack", "Flowmatic", "Vectorlane"];
const mentorTile = (m) => typeof m === "string"
  ? `<div class="logo-tile">${m}</div>`
  : `<div class="logo-tile logo-tile-img"><img src="${m.logo}" alt="${m.name}" height="28"></div>`;
document.getElementById("mentorLogoTrack").innerHTML = MENTOR_BG_NAMES.concat(MENTOR_BG_NAMES).map(mentorTile).join("");

/* ==========================================================================
   Tools marquee: technology logos (assets/img/tech/*.svg, Devicon - MIT) in two opposite-direction rows
   ========================================================================== */
const TECH_ENGINEERING = [
  { name: "Python", file: "python" }, { name: "SQL", file: "sql" }, { name: "Apache Spark", file: "apachespark" },
  { name: "Airflow", file: "airflow" }, { name: "Docker", file: "docker" }, { name: "Kubernetes", file: "kubernetes" },
  { name: "React", file: "react" }, { name: "Node.js", file: "nodejs" }, { name: "TensorFlow", file: "tensorflow" }, { name: "Git", file: "git" },
];
const TECH_BUSINESS = [
  { name: "Excel", file: "microsoftexcel" }, { name: "Power BI", file: "powerbi" }, { name: "Tableau", file: "tableau" },
  { name: "Google Analytics", file: "googleanalytics" }, { name: "Google Ads", file: "googleads" }, { name: "HubSpot", file: "hubspot" },
  { name: "Salesforce", file: "salesforce" }, { name: "SAP", file: "sap" }, { name: "QuickBooks", file: "quickbooks" },
  { name: "Jira", file: "jira" }, { name: "Notion", file: "notion" }, { name: "Mailchimp", file: "mailchimp" },
  { name: "Canva", file: "canva" }, { name: "Slack", file: "slack" },
];
const techTile = (t, dup) => `<div class="tech-tile${dup ? " tech-dup" : ""}"${dup ? ' aria-hidden="true"' : ""}><span class="tech-ic"><img src="assets/img/tech/${t.file}.svg" alt="" width="32" height="32" decoding="async"></span><span class="tech-name">${t.name}</span></div>`;
/* the list is rendered twice so translating the track by exactly -50% loops without a jump */
const techRow = (list) => list.map(t => techTile(t, false)).join("") + list.map(t => techTile(t, true)).join("");
document.getElementById("techTrackA").innerHTML = techRow(TECH_ENGINEERING);
document.getElementById("techTrackB").innerHTML = techRow(TECH_BUSINESS);

const techMarquee = document.getElementById("techMarquee");
if ("IntersectionObserver" in window) {
  const techObserver = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) { techMarquee.classList.add("tech-in"); techObserver.disconnect(); }
  }, { threshold: 0.1 });
  techObserver.observe(techMarquee);
} else {
  techMarquee.classList.add("tech-in");
}

/* ==========================================================================
   Projects
   ========================================================================== */
document.getElementById("projGrid").innerHTML = PROJECTS.map((p, i) => `
  <div class="proj-card">
    <div class="num">0${i + 1}</div>
    <div class="kind">${p.kind}</div>
    <h4>${p.title}</h4>
    <p>${p.desc}</p>
  </div>
`).join("");

/* ==========================================================================
   Reviews
   ========================================================================== */
document.getElementById("reviewGrid").innerHTML = REVIEWS.map(r => `
  <div class="review-card">
    <div class="stars">${"★".repeat(5)}</div>
    <p class="quote">"${r.quote}"</p>
    <div class="review-person">
      <div class="avatar">${r.name.split(" ").map(w => w[0]).join("")}</div>
      <div><div class="name">${r.name}</div><div class="role">${r.role}</div></div>
    </div>
  </div>
`).join("");

/* ==========================================================================
   FAQ accordion
   ========================================================================== */
document.getElementById("faqList").innerHTML = FAQS.map((f, i) => `
  <div class="faq-item ${i === 0 ? "open" : ""}">
    <div class="faq-q" role="button" tabindex="0" aria-expanded="${i === 0}" id="faq-q-${i}" aria-controls="faq-a-${i}">
      <div class="ic"><i class="${f.icon}" aria-hidden="true"></i></div>
      <div><span class="tag">${f.tag}</span><h4>${f.q}</h4></div>
      <button class="toggle-btn" tabindex="-1" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></button>
    </div>
    <div class="faq-a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}">
      <p>${f.a}</p>
      <div class="mini-links"><span>Pricing</span><span>Reviews</span><span>Support</span></div>
    </div>
  </div>
`).join("");
document.querySelectorAll(".faq-q").forEach(q => {
  const toggle = () => {
    const open = q.closest(".faq-item").classList.toggle("open");
    q.setAttribute("aria-expanded", String(open));
  };
  q.addEventListener("click", toggle);
  q.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); }
  });
});

/* ==========================================================================
   Stepper (enrollment flow)
   ========================================================================== */
const STEPS = [
  { label: "Register", icon: "fa-solid fa-user-plus", tag: "Step 01", title: "Create your account", checks: ["Basic details", "Verify email", "Set a password"], panelTitle: "Tell us who you are.", info: "A quick sign-up so we can save your progress and send batch updates." },
  { label: "Share goals", icon: "fa-regular fa-file-lines", tag: "Step 02", title: "Share goals", checks: ["Role clarity", "Skill baseline", "Right track match"], panelTitle: "Tell us your target role and current skill level.", info: "This helps us recommend the right starting point instead of guessing." },
  { label: "Pick a program", icon: "fa-solid fa-bullseye", tag: "Step 03", title: "Pick a program", checks: ["Compare tracks", "Check curriculum", "Confirm batch date"], panelTitle: "Choose the track that matches your goal.", info: "Browse curriculum and pick a confirmed upcoming batch." },
  { label: "Payment & access", icon: "fa-solid fa-credit-card", tag: "Step 04", title: "Payment & access", checks: ["Secure checkout", "Instant confirmation", "LMS access granted"], panelTitle: "Complete payment to lock your seat.", info: "Seats are batch-limited, so this confirms your spot in the cohort." },
  { label: "Start learning", icon: "fa-solid fa-graduation-cap", tag: "Step 05", title: "Start learning", checks: ["Orientation call", "Meet your mentor", "First live class"], panelTitle: "You're in — welcome to the cohort.", info: "From here it's live classes, project checkpoints, and mentor reviews." },
];
let currentStep = 1;

function renderStepper() {
  document.getElementById("stepper").innerHTML = STEPS.map((s, i) => `
    <div class="step-node ${i + 1 < currentStep ? "done" : ""} ${i + 1 === currentStep ? "active" : ""}" data-step="${i + 1}">
      <div class="circle"><i class="${s.icon}"></i></div>
      <span class="label">${s.label}</span>
      <div class="step-line"></div>
    </div>
  `).join("");
  document.querySelectorAll(".step-node").forEach(n => n.addEventListener("click", () => { currentStep = +n.dataset.step; renderStepper(); renderStepPanel(); }));
}
function renderStepPanel() {
  const s = STEPS[currentStep - 1];
  document.getElementById("stepPanel").innerHTML = `
    <div class="step-card">
      <span class="tag">${s.tag}</span>
      <h3>${s.title}</h3>
      <ul class="check-list">${s.checks.map(c => `<li><i class="fa-solid fa-circle-check"></i>${c}</li>`).join("")}</ul>
    </div>
    <div class="step-info">
      <span class="tag">What happens here</span>
      <h3>${s.panelTitle}</h3>
      <p style="color:var(--ink-300);font-size:14px;margin-bottom:20px;">${s.info}</p>
      <div class="progress-label"><span>Progress</span><span>${currentStep}/${STEPS.length}</span></div>
      <div class="progress-track"><div class="progress-fill" style="width:${(currentStep / STEPS.length) * 100}%"></div></div>
      <div class="step-controls">
        <button class="btn btn-outline" id="stepBack" ${currentStep === 1 ? "disabled style='opacity:.4'" : ""}><i class="fa-solid fa-chevron-left"></i> Back</button>
        <button class="btn btn-primary" id="stepNext">${currentStep === STEPS.length ? "Finish" : "Next"} <i class="fa-solid fa-chevron-right"></i></button>
      </div>
    </div>
  `;
  document.getElementById("stepBack").addEventListener("click", () => { if (currentStep > 1) { currentStep--; renderStepper(); renderStepPanel(); } });
  document.getElementById("stepNext").addEventListener("click", () => { if (currentStep < STEPS.length) { currentStep++; renderStepper(); renderStepPanel(); } });
}
renderStepper();
renderStepPanel();

/* ==========================================================================
   Certificate preview swipe
   ========================================================================== */
const CERT_TABS = [
  { label: "Training · Cohort completion", kind: "Certificate", desc: "Awarded for completing a mentor-led training program with rubric-based evaluation of all deliverables." },
  { label: "Internship · Project + review proof", kind: "Internship Certificate", desc: "Awarded for completing an internship-style project track reviewed against hiring-team rubrics." },
  { label: "Excellence · Top performance", kind: "Certificate of Excellence", desc: "Awarded to top-performing learners for outstanding project quality and consistency." },
];
let certIndex = 0;
function renderCert() {
  const c = CERT_TABS[certIndex];
  document.getElementById("certLabel").textContent = c.label;
  document.getElementById("certKind").textContent = c.kind;
  document.getElementById("certDesc").textContent = c.desc;
  document.querySelectorAll(".cert-tabs button").forEach((b, i) => b.classList.toggle("active", i === certIndex));
}
document.getElementById("certPrev").addEventListener("click", () => { certIndex = (certIndex - 1 + CERT_TABS.length) % CERT_TABS.length; renderCert(); });
document.getElementById("certNext").addEventListener("click", () => { certIndex = (certIndex + 1) % CERT_TABS.length; renderCert(); });
document.querySelectorAll(".cert-tabs button").forEach(b => b.addEventListener("click", () => { certIndex = +b.dataset.tab; renderCert(); }));

/* ==========================================================================
   Nav: mega/dropdown toggle + mobile menu
   ========================================================================== */
let navCloseTimer = null;
document.querySelectorAll(".nav-item").forEach(item => {
  const btn = item.querySelector(".nav-link");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
  // Desktop hover: open on enter, close shortly after leaving (so moving the
  // mouse into the dropdown itself doesn't close it).
  item.addEventListener("mouseenter", () => {
    if (window.matchMedia("(max-width: 980px)").matches) return;
    clearTimeout(navCloseTimer);
    document.querySelectorAll(".nav-item.open").forEach(i => { if (i !== item) i.classList.remove("open"); });
    item.classList.add("open");
  });
  item.addEventListener("mouseleave", () => {
    if (window.matchMedia("(max-width: 980px)").matches) return;
    navCloseTimer = setTimeout(() => item.classList.remove("open"), 150);
  });
});
document.addEventListener("click", () => document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open")));

const navLinks = document.getElementById("navLinks");
const mobileToggleBtn = document.getElementById("mobileToggle");
const mobileToggleIcon = mobileToggleBtn.querySelector("i");
const setMobileToggleOpen = (open) => {
  mobileToggleBtn.setAttribute("aria-expanded", String(open));
  if (mobileToggleIcon) mobileToggleIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
};
mobileToggleBtn.addEventListener("click", () => setMobileToggleOpen(navLinks.classList.toggle("open")));
navLinks.querySelectorAll("a.nav-link").forEach(a => a.addEventListener("click", () => {
  navLinks.classList.remove("open");
  setMobileToggleOpen(false);
}));

/* ---------- Get roadmap modal ---------- */
const roadmapModal = document.getElementById("roadmapModal");
let roadmapTriggerEl = null;

function openRoadmapModal(triggerEl) {
  roadmapTriggerEl = triggerEl || document.activeElement;
  document.getElementById("roadmapForm").style.display = "block";
  document.getElementById("roadmapSuccess").classList.remove("show");
  roadmapModal.classList.add("open");
  document.getElementById("rmName").focus();
}
let roadmapRepeatTimer = null;
const ROADMAP_REPEAT_MS = 120000;

function scheduleRoadmapRepeat() {
  if (sessionStorage.getItem("roadmapModalSubmitted")) return;
  clearTimeout(roadmapRepeatTimer);
  roadmapRepeatTimer = setTimeout(() => {
    if (!roadmapModal.classList.contains("open")) {
      openRoadmapModal(document.getElementById("getPlanBtn"));
    }
  }, ROADMAP_REPEAT_MS);
}

function closeRoadmapModal() {
  roadmapModal.classList.remove("open");
  if (roadmapTriggerEl) { roadmapTriggerEl.focus(); roadmapTriggerEl = null; }
  scheduleRoadmapRepeat();
}
document.getElementById("getPlanBtn").addEventListener("click", (e) => openRoadmapModal(e.currentTarget));
document.getElementById("faqTalkToMentor")?.addEventListener("click", (e) => { e.preventDefault(); openRoadmapModal(e.currentTarget); });
document.getElementById("roadmapModalClose").addEventListener("click", closeRoadmapModal);
roadmapModal.addEventListener("click", (e) => { if (e.target === roadmapModal) closeRoadmapModal(); });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && roadmapModal.classList.contains("open")) closeRoadmapModal();
});
document.getElementById("roadmapForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("roadmapForm").style.display = "none";
  document.getElementById("roadmapSuccess").classList.add("show");
  sessionStorage.setItem("roadmapModalSubmitted", "1");
  clearTimeout(roadmapRepeatTimer);
});

/* Auto-open the roadmap modal 5s after the visitor lands, then every 120s after each close */
if (!sessionStorage.getItem("roadmapModalSubmitted")) {
  setTimeout(() => {
    if (!roadmapModal.classList.contains("open")) {
      openRoadmapModal(document.getElementById("getPlanBtn"));
    }
  }, 5000);
}
document.getElementById("signInBtn").addEventListener("click", (e) => { e.preventDefault(); alert("Sign In flow goes here — hook this up to your auth system."); });
const copilotNavBtn = document.getElementById("copilotNavBtn");
if (copilotNavBtn) copilotNavBtn.addEventListener("click", (e) => { e.preventDefault(); openChat(); });

/* ==========================================================================
   Chat widget
   ========================================================================== */
const chatPanel = document.getElementById("chatPanel");
const chatPreamble = document.getElementById("chatPreamble");
const chatBody = document.getElementById("chatBody");
function openChat() { chatPanel.classList.add("open"); chatPreamble.style.display = "none"; }
document.getElementById("chatFab").addEventListener("click", () => chatPanel.classList.toggle("open"));
document.getElementById("chipQuestion").addEventListener("click", openChat);
document.getElementById("chipMore").addEventListener("click", openChat);
document.getElementById("chatPreambleClose").addEventListener("click", () => { chatPreamble.style.display = "none"; });

function addMsg(text, isUser) {
  const div = document.createElement("div");
  div.className = "chat-msg" + (isUser ? " user" : "");
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
}
function sendChat() {
  const input = document.getElementById("chatInput");
  const val = input.value.trim();
  if (!val) return;
  addMsg(val, true);
  input.value = "";
  setTimeout(() => addMsg("Thanks! A mentor will follow up shortly — meanwhile check the FAQ section below for quick answers.", false), 500);
}
document.getElementById("chatSend").addEventListener("click", sendChat);
document.getElementById("chatInput").addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });

/* ==========================================================================
   Batch countdown
   ========================================================================== */
function updateCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 9, 10); // 10 Oct
  if (target <= now) target = new Date(now.getFullYear() + 1, 9, 10);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  document.getElementById("batchDays").textContent = `${days}d ${hours}h ${mins}m`;
}
updateCountdown();
setInterval(updateCountdown, 30000);

document.getElementById("year").textContent = new Date().getFullYear();
