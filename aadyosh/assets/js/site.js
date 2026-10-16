/* ==========================================================================
   aadyosh — shared site chrome (nav + chat widget + footer year)
   Used on sub-pages (features, copilot, campus-ambassador, reviews).
   index.html has its own full main.js which already includes this logic.
   ========================================================================== */

document.querySelectorAll(".nav-item").forEach(item => {
  const btn = item.querySelector(".nav-link");
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = item.classList.contains("open");
    document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});
document.addEventListener("click", () => document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open")));

const navLinks = document.getElementById("navLinks");
const mobileToggleBtn = document.getElementById("mobileToggle");
if (mobileToggleBtn) {
  const toggleIcon = mobileToggleBtn.querySelector("i");
  const setToggleOpen = (open) => {
    mobileToggleBtn.setAttribute("aria-expanded", String(open));
    if (toggleIcon) toggleIcon.className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  };
  mobileToggleBtn.addEventListener("click", () => setToggleOpen(navLinks.classList.toggle("open")));
  navLinks.querySelectorAll("a.nav-link").forEach(a => a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    setToggleOpen(false);
  }));
}

const signInBtn = document.getElementById("signInBtn");
if (signInBtn) signInBtn.addEventListener("click", (e) => { e.preventDefault(); alert("Sign In flow goes here — hook this up to your auth system."); });

/* ---------- chat widget ---------- */
const chatPanel = document.getElementById("chatPanel");
const chatBody = document.getElementById("chatBody");
const chatFab = document.getElementById("chatFab");
if (chatFab) chatFab.addEventListener("click", () => chatPanel.classList.toggle("open"));

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
  setTimeout(() => addMsg("Thanks! A mentor will follow up shortly — meanwhile check the FAQ section on the homepage for quick answers.", false), 500);
}
const chatSendBtn = document.getElementById("chatSend");
if (chatSendBtn) {
  chatSendBtn.addEventListener("click", sendChat);
  document.getElementById("chatInput").addEventListener("keydown", e => { if (e.key === "Enter") sendChat(); });
}

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- scroll reveal (pages with body.anim-page) ---------- */
if (document.body.classList.contains("anim-page") && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealEls = new Set(document.querySelectorAll(".anim-page .section-head, .anim-page .cta-box, .anim-page .legal-doc > *:not(.form-success), .anim-page .eco-grid > *"));
  document.querySelectorAll(".eco-grid").forEach(grid => [...grid.children].forEach((c, i) => c.style.setProperty("--d", Math.min(i, 5) * 0.09 + "s")));

  /* Reveal everything that is at or above the fold line. A scroll check (not an
     IntersectionObserver) so blocks skipped by a fast jump - End key, scrollbar
     drag, anchor link - still appear instead of staying invisible. */
  const pending = new Set(revealEls);
  let ticking = false;
  const reveal = (el) => {
    el.classList.add("rv-go", "rv-in");
    const wait = 800 + parseFloat(el.style.getPropertyValue("--d") || 0) * 1000;
    setTimeout(() => el.classList.remove("rv-go"), wait);
  };
  const check = () => {
    ticking = false;
    const line = window.innerHeight - 40;
    pending.forEach(el => {
      if (el.getBoundingClientRect().top < line) { pending.delete(el); reveal(el); }
    });
    if (!pending.size) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(check); } };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();
}

/* ---------- stat card reveal + count-up ---------- */
const statCards = document.querySelectorAll(".stat-card");
if (statCards.length) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateCount = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/^([\d,]+)(.*)$/);
    if (!match || prefersReducedMotion) return;
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    if (isNaN(target)) return;
    const duration = 1100;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = raw;
    }
    requestAnimationFrame(tick);
  };

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in-view");
      const numEl = entry.target.querySelector(".num");
      if (numEl) animateCount(numEl);
      statObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  statCards.forEach(card => statObserver.observe(card));
}
