/* ==========================================================================
   aadyosh — form submissions to the backend (backend/server.py)

   Intercepts the four site forms in the capture phase, validates/stores them
   through the JSON API, and only then lets the page's own submit handler run
   (which shows the existing "thanks" state). On failure the form stays open
   and an inline error is shown.
   ========================================================================== */
(function () {
  const val = (id) => (document.getElementById(id)?.value || "").trim();

  const FORMS = {
    roadmapForm: {
      endpoint: "leads",
      collect: () => ({ name: val("rmName"), phone: val("rmPhone"), college: val("rmCollege"), grad_year: val("rmGradYear"), state: val("rmState"), department: val("rmDept") }),
    },
    mentorForm: {
      endpoint: "mentor-request",
      collect: () => ({ program: val("mtProgram"), domain: val("mtDomain"), name: val("mtName"), phone: val("mtPhone"), email: val("mtEmail"), preferred_time: val("mtTime"), message: val("mtMessage") }),
    },
    supportForm: {
      endpoint: "support",
      collect: () => ({ topic: val("suTopic"), name: val("suName"), email: val("suEmail"), phone: val("suPhone"), message: val("suMessage") }),
    },
    ambForm: {
      endpoint: "ambassador",
      collect: () => ({ name: val("fullName"), email: val("email"), phone: val("phone"), college: val("college"), referral: val("referral"), grad_year: document.querySelector(".year-pill.active")?.dataset.year || "" }),
    },
    deleteForm: {
      endpoint: "delete-request",
      collect: () => ({ name: val("delName"), email: val("delEmail"), reason: val("delReason"), confirmed: !!document.getElementById("delConfirm")?.checked }),
    },
  };

  /* Honeypot: invisible to people, tempting to bots. Server drops filled ones. */
  Object.keys(FORMS).forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;
    const hp = document.createElement("input");
    hp.type = "text"; hp.name = "fax"; hp.tabIndex = -1; hp.autocomplete = "off";
    hp.setAttribute("aria-hidden", "true");
    hp.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;opacity:0;";
    form.appendChild(hp);
  });

  const passed = new WeakSet();

  function showError(form, msg) {
    let el = form.querySelector(".form-error");
    if (!el) {
      el = document.createElement("p");
      el.className = "form-error";
      el.setAttribute("role", "alert");
      const btn = form.querySelector("[type=submit]");
      btn.parentNode.insertBefore(el, btn);
    }
    el.textContent = msg;
  }

  document.addEventListener("submit", async (e) => {
    const form = e.target;
    const cfg = FORMS[form.id];
    if (!cfg) return;
    if (passed.has(form)) { passed.delete(form); return; }   // our own re-dispatch: let page handlers run

    e.preventDefault();
    e.stopImmediatePropagation();
    form.querySelector(".form-error")?.remove();

    const btn = form.querySelector("[type=submit]");
    const label = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = "Sending...";

    const payload = { ...cfg.collect(), source: location.pathname.split("/").pop() || "index.html" };
    const hp = form.querySelector('input[name="fax"]');
    if (hp && hp.value) payload.fax = hp.value;

    try {
      const res = await fetch("/api/" + cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const first = data.fields && Object.values(data.fields)[0];
        throw new Error(first || data.error || "Something went wrong.");
      }
      passed.add(form);
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    } catch (err) {
      const offline = err instanceof TypeError;
      showError(form, offline ? "Couldn't reach the server. Check your connection and try again." : err.message);
    } finally {
      btn.disabled = false;
      btn.innerHTML = label;
    }
  }, true);
})();
