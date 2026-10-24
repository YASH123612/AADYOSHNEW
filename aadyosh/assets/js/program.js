/* ==========================================================================
   aadyosh — Program detail page data + render
   ========================================================================== */
const PROGRAM_DATA = {
  "artificial-intelligence": {
    title: "Artificial Intelligence",
    badge: "Popular track",
    icon: "fa-solid fa-brain",
    orbitIcons: ["fa-solid fa-robot", "fa-solid fa-database", "fa-solid fa-comments", "fa-brands fa-python", "fa-solid fa-magnifying-glass-chart", "fa-solid fa-microchip", "fa-solid fa-eye"],
    stats: { enrolled: "1,240+", rating: "4.8/5", reviews: "312 reviews", seats: "14 seats left" },
    desc: "Go from core concepts to hands-on applications. Cover ML foundations, deep learning, NLP, and computer vision to understand how intelligent systems are built and used in real products.",
    tiles: [
      { lbl: "Duration", val: "8 weeks · Accelerated", ic: "fa-regular fa-clock" },
      { lbl: "Format", val: "Mentor-led + LMS", ic: "fa-solid fa-chalkboard-user" },
      { lbl: "Projects", val: "Internship + projects", ic: "fa-solid fa-diagram-project" },
      { lbl: "Certificate", val: "Verified certificate", ic: "fa-solid fa-award" },
    ],
    modules: [
      { code: "M01", topics: 4, title: "AI Overview & Core Ideas", items: ["AI evolution and key milestones", "Where AI is applied today", "Ethics and responsible use", "Environment setup for AI work"], deliverables: ["Skill checkpoint", "Setup + onboarding"] },
      { code: "M02", topics: 3, title: "Python Toolkit for AI", items: ["NumPy, pandas, and data handling", "Visualizing data for ML", "Working with notebooks"], deliverables: ["Guided exercise", "Peer review"] },
      { code: "M03", topics: 4, title: "Machine Learning Foundations", items: ["Supervised vs. unsupervised learning", "Model training and evaluation", "Feature engineering basics", "Common pitfalls and overfitting"], deliverables: ["Project milestone", "Mentor checkpoint"] },
      { code: "M04", topics: 3, title: "Deep Learning Foundations", items: ["Neural network fundamentals", "Training with backpropagation", "Frameworks: PyTorch/TensorFlow basics"], deliverables: ["Project milestone", "Code review"] },
      { code: "M05", topics: 3, title: "Natural Language Processing", items: ["Text preprocessing and embeddings", "Transformer models (overview)", "Building a simple NLP pipeline"], deliverables: ["Mini project", "Mentor checkpoint"] },
      { code: "M06", topics: 3, title: "Capstone & Deployment", items: ["Choosing and scoping your capstone", "Deploying a model (overview)", "Presenting your work"], deliverables: ["Capstone project", "Certificate-ready review"] },
    ],
    projects: [
      { title: "Text Summarization Model", desc: "Train a model that condenses long articles into clear summaries." },
      { title: "Medical Imaging Classifier", desc: "Build a model that flags anomalies in sample diagnostic images." },
      { title: "Conversational AI Assistant", desc: "Design and ship a domain-specific chatbot with guided flows." },
      { title: "Recommendation Engine", desc: "Build a recommender system from a sample product/interaction dataset." },
      { title: "Sentiment Analysis Tool", desc: "Classify sentiment across a real-world text dataset with evaluation." },
      { title: "Image Classifier", desc: "Train and evaluate a computer-vision model on a labeled image set." },
    ],
    price: { now: "7,999", was: "9,499" },
    faqs: [
      { q: "Do I need a coding background for this track?", a: "Basic Python helps but isn't required. Module 2 builds the Python foundation you'll use throughout." },
      { q: "What math is involved?", a: "We cover the intuition behind linear algebra, probability, and calculus as needed — this isn't a pure math course." },
      { q: "What do I walk away with?", a: "A capstone project, a portfolio of smaller builds, and a mentor-reviewed certificate tied to your actual deliverables." },
    ],
  },
};

/* Known slugs get a curated title/icon/description + orbit theme; the module,
   project, pricing, and FAQ structure below stays the shared generic template
   until each track gets a full custom curriculum like Artificial Intelligence. */
const PROGRAM_META = {
  "aws-cloud": { title: "AWS Cloud", icon: "fa-brands fa-aws", desc: "Learn core AWS services, infrastructure-as-code, and how to run production workloads reliably in the cloud.", orbitIcons: ["fa-solid fa-server", "fa-solid fa-cloud", "fa-solid fa-lock", "fa-solid fa-network-wired", "fa-solid fa-database", "fa-solid fa-gears", "fa-solid fa-chart-line"] },
  "programming-in-java": { title: "Programming in Java", icon: "fa-brands fa-java", desc: "Build a strong foundation in Java — OOP, collections, and multithreading — through hands-on, reviewed practice.", orbitIcons: ["fa-brands fa-java", "fa-solid fa-code", "fa-solid fa-cubes", "fa-solid fa-bug", "fa-solid fa-layer-group", "fa-solid fa-gears", "fa-solid fa-diagram-project"] },
  "programming-in-python": { title: "Programming in Python", icon: "fa-brands fa-python", desc: "Go from Python fundamentals to applied scripting, data analysis, and automation with mentor feedback.", orbitIcons: ["fa-brands fa-python", "fa-solid fa-chart-line", "fa-solid fa-table", "fa-solid fa-code", "fa-solid fa-microchip", "fa-solid fa-database", "fa-solid fa-flask"] },
  "graphic-designing": { title: "Graphic Designing", icon: "fa-solid fa-pen-nib", desc: "Learn Figma, branding fundamentals, and design systems to ship visual work that holds up in a real portfolio.", orbitIcons: ["fa-solid fa-pen-nib", "fa-solid fa-palette", "fa-solid fa-shapes", "fa-solid fa-swatchbook", "fa-solid fa-layer-group", "fa-solid fa-image", "fa-solid fa-vector-square"] },
  "cyber-security": { title: "Cyber Security & Ethical Hacking", icon: "fa-solid fa-user-shield", desc: "Learn defensive fundamentals and ethical hacking practice — from threat basics to hands-on labs.", orbitIcons: ["fa-solid fa-shield-halved", "fa-solid fa-lock", "fa-solid fa-bug", "fa-solid fa-network-wired", "fa-solid fa-key", "fa-solid fa-user-secret", "fa-solid fa-terminal"] },
  "devops": { title: "DevOps", icon: "fa-solid fa-infinity", desc: "Build real CI/CD pipelines and learn the deployment and reliability practices behind shipping software safely.", orbitIcons: ["fa-solid fa-infinity", "fa-brands fa-docker", "fa-solid fa-server", "fa-solid fa-cloud", "fa-solid fa-code-branch", "fa-solid fa-gears", "fa-solid fa-chart-line"] },
  "dsa-system-design": { title: "DSA + System Design", icon: "fa-solid fa-sitemap", desc: "Sharpen data structures and algorithms, then learn to design systems that scale — the core of technical interviews.", orbitIcons: ["fa-solid fa-sitemap", "fa-solid fa-code", "fa-solid fa-server", "fa-solid fa-diagram-project", "fa-solid fa-database", "fa-solid fa-network-wired", "fa-solid fa-scale-balanced"] },
  "machine-learning": { title: "Machine Learning", icon: "fa-solid fa-microchip", desc: "Learn to train, evaluate, and ship machine learning models with a project-first, mentor-reviewed approach.", orbitIcons: ["fa-solid fa-microchip", "fa-brands fa-python", "fa-solid fa-chart-line", "fa-solid fa-table", "fa-solid fa-brain", "fa-solid fa-flask", "fa-solid fa-diagram-project"] },
  "data-science": { title: "Data Science", icon: "fa-solid fa-database", desc: "Go from raw data to real insight — statistics, analysis, and modeling applied to real-world datasets.", orbitIcons: ["fa-solid fa-database", "fa-solid fa-chart-line", "fa-brands fa-python", "fa-solid fa-table", "fa-solid fa-magnifying-glass-chart", "fa-solid fa-flask", "fa-solid fa-server"] },
  "data-analytics": { title: "Data Analytics", icon: "fa-solid fa-chart-simple", desc: "Turn raw numbers into dashboards and decisions — metrics, visualization, and business-facing analysis.", orbitIcons: ["fa-solid fa-chart-simple", "fa-solid fa-table", "fa-solid fa-magnifying-glass-chart", "fa-solid fa-database", "fa-solid fa-chart-pie", "fa-solid fa-filter", "fa-solid fa-diagram-project"] },
  "ui-ux": { title: "UI / UX", icon: "fa-solid fa-swatchbook", desc: "Design usable, well-crafted product experiences — research, wireframes, and high-fidelity UI, reviewed by mentors.", orbitIcons: ["fa-solid fa-swatchbook", "fa-solid fa-pen-nib", "fa-solid fa-shapes", "fa-solid fa-mobile-screen", "fa-solid fa-layer-group", "fa-solid fa-vector-square", "fa-solid fa-magnifying-glass"] },
};

function catalogEntry(slug) {
  for (const cat of Object.keys(PROGRAMS)) {
    const hit = PROGRAMS[cat].find(p => slugify(p.title) === slug);
    if (hit) return hit;
  }
  return null;
}

/* "Title | topic; topic | deliverable; deliverable" -> module object (see syllabus-data.js) */
function parseSyllabus(rows) {
  const split = s => s.split(";").map(x => x.trim()).filter(Boolean);
  return rows.map((row, i) => {
    const [title, items, deliverables] = row.split("|").map(x => x.trim());
    const list = split(items);
    return { code: "M" + String(i + 1).padStart(2, "0"), topics: list.length, title, items: list, deliverables: split(deliverables) };
  });
}

function genericProgram(slug) {
  const meta = PROGRAM_META[slug];
  const cat = catalogEntry(slug);
  const title = meta ? meta.title : cat ? cat.title : slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    title,
    badge: "Program",
    icon: meta ? meta.icon : cat ? cat.icon : "fa-solid fa-layer-group",
    desc: meta ? meta.desc : cat ? `${cat.desc} — a mentor-led, project-based track with a structured module roadmap, reviewed deliverables and a verified certificate.` : `A mentor-led, project-based track in ${title}, with a structured module roadmap and reviewed deliverables.`,
    tiles: [
      { lbl: "Duration", val: "6–8 weeks", ic: "fa-regular fa-clock" },
      { lbl: "Format", val: "Mentor-led + LMS", ic: "fa-solid fa-chalkboard-user" },
      { lbl: "Projects", val: "Internship + projects", ic: "fa-solid fa-diagram-project" },
      { lbl: "Certificate", val: "Verified certificate", ic: "fa-solid fa-award" },
    ],
    modules: (typeof SYLLABUS !== "undefined" && SYLLABUS[slug]) ? parseSyllabus(SYLLABUS[slug]) : [
      { code: "M01", topics: 4, title: "Foundations & Core Ideas", items: ["Field overview and key milestones", "Where these skills are applied today", "Ethics and responsible use", "Environment setup"], deliverables: ["Skill checkpoint", "Setup + onboarding"] },
      { code: "M02", topics: 3, title: "Core Toolkit", items: ["Essential tools and libraries", "Hands-on practice drills", "Common workflow patterns"], deliverables: ["Guided exercise", "Peer review"] },
      { code: "M03", topics: 4, title: "Applied Practice", items: ["Working with real datasets / cases", "Debugging and iteration", "Performance considerations", "Documentation habits"], deliverables: ["Project milestone", "Mentor checkpoint"] },
      { code: "M04", topics: 3, title: "Real-World Application", items: ["Ethics in practice", "Deploying your solution (overview)", "Presenting your work"], deliverables: ["Project milestone", "Certificate-ready review"] },
    ],
    projects: [
      { title: "Portfolio Project 1", desc: "A guided build that demonstrates your core skills end-to-end." },
      { title: "Portfolio Project 2", desc: "A more advanced build reviewed by a working mentor." },
    ],
    price: { now: "7,499", was: "8,999" },
    faqs: [
      { q: "Is this beginner friendly?", a: "Yes. You start fundamentals-first, then move into structured projects with checkpoints." },
      { q: "Do you provide a certificate?", a: "Yes — issued after your deliverables pass mentor review." },
    ],
    orbitIcons: meta ? meta.orbitIcons : ["fa-solid fa-code", "fa-solid fa-cloud", "fa-solid fa-chart-line", "fa-solid fa-diagram-project", "fa-solid fa-shield-halved", "fa-solid fa-gears", "fa-solid fa-lightbulb"],
    stats: { enrolled: "600+", rating: "4.7/5", reviews: "140 reviews", seats: "Limited seats" },
  };
}

const params = new URLSearchParams(location.search);
const slug = params.get("slug") || "artificial-intelligence";
const data = PROGRAM_DATA[slug] || genericProgram(slug);

document.title = data.title + " — aadyosh";

document.getElementById("progIcon").innerHTML = `<i class="${data.icon}"></i>`;
(data.orbitIcons || []).forEach((ic, i) => {
  const el = document.getElementById("oi" + (i + 1));
  if (el) el.innerHTML = `<i class="${ic}" aria-hidden="true"></i>`;
});
if (data.stats) {
  document.getElementById("statEnrolled").textContent = data.stats.enrolled;
  document.getElementById("statRating").textContent = data.stats.rating;
  document.getElementById("statReviews").textContent = data.stats.reviews;
  document.getElementById("seatsLeft").textContent = data.stats.seats;
}
document.getElementById("progBadge").textContent = data.badge;
document.getElementById("progTitle").textContent = data.title;
document.getElementById("progDesc").textContent = data.desc;

document.getElementById("infoTiles").innerHTML = data.tiles.map(t => `
  <div class="info-tile">
    <div class="lbl"><i class="${t.ic}" aria-hidden="true"></i> ${t.lbl}</div>
    <div class="val">${t.val}</div>
  </div>
`).join("");

const PARTNER_NAMES = ["Nexora", "Vantage Cloud", "Meridian Tech", "Orbital Data", "Solvix"];
document.getElementById("mentorLogos").innerHTML = PARTNER_NAMES.map(n => `<span>${n}</span>`).join("");

document.getElementById("curricCount").textContent = `${data.modules.length} modules · ${data.modules.reduce((a, m) => a + m.topics, 0)} topics`;

function renderModules(filter) {
  const f = (filter || "").toLowerCase();
  const filtered = data.modules.filter(m =>
    !f || m.title.toLowerCase().includes(f) || m.items.some(i => i.toLowerCase().includes(f))
  );
  document.getElementById("moduleList").innerHTML = filtered.map((m, i) => `
    <div class="module-item ${i === 0 ? "open" : ""}">
      <div class="module-head" role="button" tabindex="0" aria-expanded="${i === 0}">
        <div>
          <div class="tags"><span>${m.code}</span><span>${m.topics} topics</span><span class="badge">Mentor-led</span></div>
          <h4>${m.title}</h4>
        </div>
        <button class="module-toggle" tabindex="-1" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></button>
      </div>
      <div class="module-body">
        <div>
          <h5>Topics covered</h5>
          <ul>${m.items.map(t => `<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i>${t}</li>`).join("")}</ul>
        </div>
        <div>
          <h5>Deliverables</h5>
          ${m.deliverables.map(d => `<span class="deliv-chip">${d}</span>`).join("")}
          <p style="font-size:12.5px;color:var(--ink-400);margin-top:10px;">Deliverables are reviewed with mentor feedback.</p>
        </div>
        <div class="module-nav">
          <button type="button" class="btn btn-outline" data-go="${i - 1}" ${i === 0 ? "disabled" : ""}><i class="fa-solid fa-chevron-left" aria-hidden="true"></i> Previous</button>
          <button type="button" class="btn btn-outline" data-go="${i + 1}" ${i === filtered.length - 1 ? "disabled" : ""}>Next module <i class="fa-solid fa-chevron-right" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  `).join("") || `<p style="color:var(--ink-500);font-size:14px;">No topics match your search.</p>`;

  const items = [...document.querySelectorAll(".module-item")];
  const setOpen = (item, open) => {
    item.classList.toggle("open", open);
    item.querySelector(".module-head").setAttribute("aria-expanded", String(open));
  };
  items.forEach(item => {
    const head = item.querySelector(".module-head");
    const toggle = () => setOpen(item, !item.classList.contains("open"));
    head.addEventListener("click", toggle);
    head.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
    item.querySelectorAll(".module-nav [data-go]").forEach(btn => btn.addEventListener("click", () => {
      const target = items[Number(btn.dataset.go)];
      if (!target) return;
      setOpen(item, false);
      setOpen(target, true);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  });
  const all = document.getElementById("expandAll");
  if (all) {
    all.hidden = !items.length;
    all.textContent = "Expand all";
    all.onclick = () => {
      const expand = all.textContent === "Expand all";
      items.forEach(it => setOpen(it, expand));
      all.textContent = expand ? "Collapse all" : "Expand all";
    };
  }
}
renderModules("");
document.getElementById("moduleSearch").addEventListener("input", (e) => renderModules(e.target.value));

/* projects come from projects-data.js (3 per program); fall back to the program's own list if a slug has none */
const trackProjects = (typeof PROJECT_LIST !== "undefined") ? PROJECT_LIST.filter(p => p.slug === slug) : [];
document.getElementById("projGrid").innerHTML = (trackProjects.length ? trackProjects : data.projects.map(p => ({ level: "Blueprint", title: p.title, desc: p.desc, tools: [] }))).map((p, i) => `
  <div class="proj-card">
    <div class="proj-top"><div class="num">0${i + 1}</div><span class="proj-level lvl-${p.level.toLowerCase()}">${p.level}</span></div>
    <h4>${p.title}</h4>
    <p>${p.desc}</p>
    ${p.tools.length ? `<div class="proj-tools">${p.tools.map(t => `<span>${t}</span>`).join("")}</div>` : ""}
  </div>
`).join("");

/* every program is the same Fellowship plan at one price (markup in program.html), so there is nothing per-program to fill in here */

document.getElementById("progFaq").innerHTML = data.faqs.map((f, i) => `
  <div class="faq-item ${i === 0 ? "open" : ""}">
    <div class="faq-q" role="button" tabindex="0" aria-expanded="${i === 0}">
      <div class="ic"><i class="fa-solid fa-circle-question" aria-hidden="true"></i></div>
      <div><h4>${f.q}</h4></div>
      <button class="toggle-btn" tabindex="-1" aria-hidden="true"><i class="fa-solid fa-chevron-down"></i></button>
    </div>
    <div class="faq-a"><p>${f.a}</p></div>
  </div>
`).join("");
document.querySelectorAll("#progFaq .faq-q").forEach(q => {
  const toggle = () => {
    const open = q.closest(".faq-item").classList.toggle("open");
    q.setAttribute("aria-expanded", String(open));
  };
  q.addEventListener("click", toggle);
  q.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
});

/* ---------- "Talk to a Mentor" pop-up: one form, filled in for whichever program/domain this page shows ---------- */
(function () {
  const modal = document.getElementById("mentorModal");
  if (!modal) return;
  const form = document.getElementById("mentorForm");
  const success = document.getElementById("mentorSuccess");

  const domain = (() => {
    for (const cat of Object.keys(PROGRAMS)) {
      if (PROGRAMS[cat].some(p => slugify(p.title) === slug)) return CAT_LABEL[cat] || "";
    }
    return "";
  })();
  document.getElementById("mtProgram").value = data.title;
  document.getElementById("mtDomain").value = domain;
  document.getElementById("mtProgramLabel").textContent = data.title;
  document.getElementById("mtSuccessProgram").textContent = data.title;

  let trigger = null;
  const focusables = () => [...modal.querySelectorAll("a[href], button:not([disabled]), input:not([type=hidden]), select, textarea")].filter(el => el.offsetParent !== null);

  function openMentor(from) {
    trigger = from || document.activeElement;
    form.style.display = "";
    success.classList.remove("show");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("mtName").focus(), 30);
  }
  function closeMentor() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (trigger && trigger.focus) trigger.focus();
  }

  document.querySelectorAll("[data-mentor]").forEach(btn => btn.addEventListener("click", (e) => { e.preventDefault(); openMentor(btn); }));
  document.getElementById("mentorModalClose").addEventListener("click", closeMentor);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeMentor(); });
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") { closeMentor(); return; }
    if (e.key === "Tab") {                       // keep keyboard focus inside the dialog
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  /* api.js saves the request first and only then re-dispatches this submit event, so reaching here means it was stored */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.style.display = "none";
    success.classList.add("show");
  });
})();

function updateBatchDays() {
  const now = new Date();
  const target = window.AADYOSH_BATCH.date;   // set by batch.js: the next upcoming batch, rolls over monthly
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  document.getElementById("progBatchDays").textContent = `${days}d ${hours}h ${mins}m`;
}
updateBatchDays();
setInterval(updateBatchDays, 30000);
document.addEventListener("batch:update", updateBatchDays);
