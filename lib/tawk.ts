"use client";

import { useEffect, useState } from "react";

/* tawk.to live chat.

   Setup: in the tawk.to dashboard open Administration > Channels > Chat Widget, copy the "Direct Chat Link"
   (https://tawk.to/chat/<PROPERTY_ID>/<WIDGET_ID>) and set it as NEXT_PUBLIC_TAWK_CHAT_LINK in Vercel / .env.local.
   While it is empty, tawk.to is NOT loaded and the built-in "Ady" demo panel is used.

   When configured, tawk.to's own floating bubble is hidden and the aadyosh chat button (and the homepage
   "I have a question" chips) open the tawk.to window instead. If tawk.to fails to load (ad-blocker, offline) the
   built-in panel stays as the fallback. */

const CHAT_LINK = (process.env.NEXT_PUBLIC_TAWK_CHAT_LINK ?? "").trim();

type TawkApi = {
  onLoad?: () => void;
  onChatMinimized?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
};
declare global {
  interface Window { Tawk_API?: TawkApi; Tawk_LoadStart?: Date }
}

let started = false;
const listeners = new Set<(live: boolean) => void>();
let isLive = false;

function start() {
  if (started || typeof window === "undefined") return;
  const m = CHAT_LINK.match(/([0-9a-f]{20,})\/([0-9a-z]+)/i);
  if (!m) return;
  started = true;
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  window.Tawk_API.onLoad = () => {
    window.Tawk_API?.hideWidget?.();
    document.documentElement.classList.add("tawk-live");
    isLive = true;
    listeners.forEach((l) => l(true));
  };
  window.Tawk_API.onChatMinimized = () => window.Tawk_API?.hideWidget?.();
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://embed.tawk.to/${m[1]}/${m[2]}`;
  s.charset = "UTF-8";
  s.setAttribute("crossorigin", "*");
  document.head.appendChild(s);
}

export function useTawk() {
  const [live, setLive] = useState(isLive);
  useEffect(() => {
    start();
    listeners.add(setLive);
    return () => { listeners.delete(setLive); };
  }, []);
  return {
    live,
    open: () => { window.Tawk_API?.showWidget?.(); window.Tawk_API?.maximize?.(); },
  };
}
