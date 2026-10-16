/* ==========================================================================
   aadyosh — tawk.to live chat integration (loaded last on every page)

   Setup: in the tawk.to dashboard open Administration > Channels > Chat Widget
   and copy the "Direct Chat Link" - it looks like
     https://tawk.to/chat/<PROPERTY_ID>/<WIDGET_ID>
   Paste that whole link into CHAT_LINK below (the embed URL that starts with
   https://embed.tawk.to/ works too). While it is empty the built-in "Ady"
   demo chat panel is used and tawk.to is NOT loaded.

   When configured, tawk.to's own floating bubble is hidden and the existing
   aadyosh chat button (and the homepage "I have a question" chips) open the
   tawk.to window instead. If tawk.to fails to load (ad-blocker, offline) the
   built-in panel stays as the fallback.
   ========================================================================== */
const TAWK_CONFIG = {
  CHAT_LINK: "",
};

(function () {
  const m = TAWK_CONFIG.CHAT_LINK.match(/([0-9a-f]{20,})\/([0-9a-z]+)/i);
  if (!m) {
    console.info("[aadyosh] tawk.to is not connected - set TAWK_CONFIG.CHAT_LINK in assets/js/tawk.js");
    return;
  }
  const PROPERTY_ID = m[1], WIDGET_ID = m[2];

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();

  const openTawk = () => {
    const chatPreamble = document.getElementById("chatPreamble");
    if (chatPreamble) chatPreamble.style.display = "none";
    Tawk_API.showWidget();
    Tawk_API.maximize();
  };

  /* Swap a node for a clone so the built-in open/toggle listeners are dropped. */
  const rebind = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const clone = el.cloneNode(true);
    el.replaceWith(clone);
    clone.addEventListener("click", openTawk);
  };

  Tawk_API.onLoad = function () {
    Tawk_API.hideWidget();
    document.documentElement.classList.add("tawk-live");
    document.getElementById("chatPanel")?.classList.remove("open");
    ["chatFab", "chipQuestion", "chipMore"].forEach(rebind);
  };
  Tawk_API.onChatMinimized = function () { Tawk_API.hideWidget(); };

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.head.appendChild(s);
})();
