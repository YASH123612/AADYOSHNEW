/* ==========================================================================
   aadyosh — shared program catalog data + mega-menu render
   Loaded on every page (before main.js / site.js) so the "Programs" nav
   dropdown shows the full catalog everywhere, not just on the homepage.
   ========================================================================== */
const PROGRAMS = {
  cs: [
    { icon: "fa-solid fa-brain", title: "Artificial Intelligence", desc: "Applied AI foundations" },
    { icon: "fa-solid fa-robot", title: "AI (Generative & Agentic)", desc: "LLMs, RAG, agentic AI" },
    { icon: "fa-solid fa-globe", title: "Full Stack Web Development", desc: "Build and ship web apps" },
    { icon: "fa-solid fa-display", title: "Front End Web Development", desc: "React, UI engineering, deploy" },
    { icon: "fa-brands fa-android", title: "Android App Development", desc: "Kotlin, Firebase, Play Store" },
    { icon: "fa-solid fa-cloud", title: "Cloud Computing", desc: "Infrastructure and cloud ops" },
    { icon: "fa-brands fa-aws", title: "AWS", desc: "Core services, IaC, production" },
    { icon: "fa-brands fa-java", title: "Programming in Java", desc: "OOP, collections, multithreading" },
    { icon: "fa-brands fa-python", title: "Programming in Python", desc: "Python, ML, analytics" },
    { icon: "fa-solid fa-pen-nib", title: "Graphic Designing", desc: "Figma, branding, visual systems" },
    { icon: "fa-solid fa-user-shield", title: "Cyber Security & Ethical Hacking", desc: "Defense, fundamentals, practice" },
    { icon: "fa-solid fa-infinity", title: "DevOps", desc: "CI/CD pipelines, deployments" },
    { icon: "fa-solid fa-sitemap", title: "DSA + System Design", desc: "Data structures, scalable design" },
    { icon: "fa-solid fa-microchip", title: "Machine Learning", desc: "Model training and evaluation" },
    { icon: "fa-solid fa-database", title: "Data Science", desc: "From raw data to real insight" },
    { icon: "fa-solid fa-chart-simple", title: "Data Analytics", desc: "Dashboards, metrics, decisions" },
    { icon: "fa-solid fa-swatchbook", title: "UI / UX", desc: "Product design and usability" },
  ],
  ee: [
    { icon: "fa-solid fa-microchip", title: "Embedded Systems", desc: "Microcontrollers, firmware" },
    { icon: "fa-solid fa-bolt", title: "Power Systems", desc: "Generation, transmission basics" },
    { icon: "fa-solid fa-satellite-dish", title: "IoT Systems", desc: "Sensors, connectivity, dashboards" },
    { icon: "fa-solid fa-plug-circle-bolt", title: "VLSI Design", desc: "Digital design fundamentals" },
    { icon: "fa-solid fa-robot", title: "Robotics & Automation", desc: "Control systems, actuators" },
  ],
  mech: [
    { icon: "fa-solid fa-cubes", title: "CAD & Product Design", desc: "SolidWorks, modeling basics" },
    { icon: "fa-solid fa-gears", title: "Mechanical Design Fundamentals", desc: "Materials, stress, mechanisms" },
    { icon: "fa-solid fa-industry", title: "Manufacturing & CAM", desc: "Production processes, tooling" },
  ],
  civil: [
    { icon: "fa-solid fa-drafting-compass", title: "Structural Design Basics", desc: "Loads, analysis, safety codes" },
  ],
  mgmt: [
    { icon: "fa-solid fa-chart-line", title: "Digital Marketing", desc: "SEO, ads, analytics" },
    { icon: "fa-solid fa-sack-dollar", title: "Finance & Investment", desc: "Markets, valuation basics" },
    { icon: "fa-solid fa-people-group", title: "Human Resources", desc: "Hiring, L&D, operations" },
    { icon: "fa-solid fa-diagram-project", title: "Product Management", desc: "Discovery, roadmaps, delivery" },
    { icon: "fa-solid fa-bullhorn", title: "Business Analytics", desc: "Data-driven decision making" },
    { icon: "fa-solid fa-gears", title: "Operations Management", desc: "Process design, efficiency" },
    { icon: "fa-solid fa-rocket", title: "Entrepreneurship & Startups", desc: "Idea to early-stage launch" },
    { icon: "fa-solid fa-truck-fast", title: "Supply Chain Management", desc: "Logistics, sourcing, planning" },
  ],
  health: [
    { icon: "fa-solid fa-notes-medical", title: "Medical Coding", desc: "ICD-10, CPT, billing workflows" },
    { icon: "fa-solid fa-flask", title: "Clinical Trial & Research", desc: "GCP, protocols, monitoring" },
    { icon: "fa-solid fa-brain", title: "Psychology", desc: "Behaviour, cognition, mental health" },
  ],
};
const CAT_LABEL = { cs: "Computer Science", ee: "Electrical & Electronics", mech: "Mechanical", civil: "Civil", mgmt: "Management", health: "Healthcare & Life Sciences" };

const SLUG_OVERRIDES = {
  "AWS": "aws-cloud",
  "Cyber Security & Ethical Hacking": "cyber-security",
};
function slugify(title) {
  if (SLUG_OVERRIDES[title]) return SLUG_OVERRIDES[title];
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function programHref(title) {
  // Sub-pages live alongside program.html; index.html shares the same directory too.
  return `program.html?slug=${slugify(title)}`;
}

function iconTile(p) {
  return `<a class="mega-card show" href="${programHref(p.title)}">
    <div class="mega-card-icon"><i class="${p.icon}" aria-hidden="true"></i></div>
    <div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="mega-tags"><span>Certificate</span><span>Mentor-led</span></div>
    </div>
  </a>`;
}
function renderMega(cat) {
  const grid = document.getElementById("megaGrid");
  if (grid) grid.innerHTML = PROGRAMS[cat].map(iconTile).join("");
}
function programCard(p, cat) {
  return `<a class="program-card" href="${programHref(p.title)}" data-cat="${cat}" aria-label="View program: ${p.title}">
    <div class="program-icon"><i class="${p.icon}" aria-hidden="true"></i></div>
    <div>
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div class="mega-tags"><span>Certificate</span><span>Mentor-led</span></div>
    </div>
  </a>`;
}
function renderProgramGrid(cat) {
  const grid = document.getElementById("programGrid");
  if (grid) grid.innerHTML = PROGRAMS[cat].map(p => programCard(p, cat)).join("");
}

document.querySelectorAll("#megaTabs .mega-tab").forEach(tab => {
  tab.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll("#megaTabs .mega-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMega(tab.dataset.cat);
  });
});
document.querySelectorAll("#tabBar button").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("#tabBar button").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderProgramGrid(tab.dataset.cat);
  });
});
renderMega("cs");
renderProgramGrid("cs");
