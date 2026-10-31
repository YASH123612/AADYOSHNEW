"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTawk } from "@/lib/tawk";

type Msg = { text: string; user: boolean };

/** Floating "Ady" chat. Becomes a launcher for tawk.to when NEXT_PUBLIC_TAWK_CHAT_LINK is set (see lib/tawk.ts). */
export function ChatWidget() {
  const pathname = usePathname();
  const home = pathname === "/";
  const { live, open: openTawk } = useTawk();

  const [panelOpen, setPanelOpen] = useState(false);
  const [preamble, setPreamble] = useState(true);
  const [msgs, setMsgs] = useState<Msg[]>([{ text: "👋 Hi! I'm Ady. Ask me about programs, pricing, certificates, or careers.", user: false }]);
  const [draft, setDraft] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight }); }, [msgs]);
  useEffect(() => { if (live) { setPanelOpen(false); setPreamble(false); } }, [live]);

  const openChat = () => {
    if (live) { openTawk(); return; }
    setPanelOpen(true);
    setPreamble(false);
  };
  const toggleFab = () => { if (live) openTawk(); else setPanelOpen((o) => !o); };

  const send = () => {
    const val = draft.trim();
    if (!val) return;
    setMsgs((m) => [...m, { text: val, user: true }]);
    setDraft("");
    setTimeout(() => setMsgs((m) => [...m, {
      text: `Thanks! A mentor will follow up shortly — meanwhile check the FAQ section ${home ? "below" : "on the homepage"} for quick answers.`,
      user: false,
    }]), 500);
  };

  return (
    <div className="chat-widget">
      {home && preamble && (
        <div id="chatPreamble">
          <div className="chat-bubble">
            <button className="chat-bubble-close" onClick={() => setPreamble(false)} aria-label="Dismiss">
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            👋 Hi! I&apos;m Ady, your aadyosh copilot. How can I help you today?
          </div>
          <div className="chat-chip-row">
            <button className="chat-chip" onClick={openChat}>I have a question</button>
            <button className="chat-chip" onClick={openChat}>Tell me more</button>
          </div>
        </div>
      )}
      <div className={"chat-panel" + (panelOpen ? " open" : "")} id="chatPanel">
        <div className="chat-panel-head"><i className="fa-solid fa-wand-magic-sparkles"></i> Ady · aadyosh Copilot</div>
        <div className="chat-panel-body" ref={bodyRef}>
          {msgs.map((m, i) => <div key={i} className={"chat-msg" + (m.user ? " user" : "")}>{m.text}</div>)}
        </div>
        <div className="chat-panel-foot">
          <input
            type="text"
            placeholder="Type a message..."
            aria-label="Type a message to Ady"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          />
          <button onClick={send} aria-label="Send message"><i className="fa-solid fa-paper-plane"></i></button>
        </div>
      </div>
      <button className="chat-fab" id="chatFab" aria-label="Open chat with Ady" aria-haspopup="dialog" onClick={toggleFab}>
        <i className="fa-solid fa-comment-dots" aria-hidden="true"></i><span className="dot" aria-hidden="true">1</span>
      </button>
    </div>
  );
}
