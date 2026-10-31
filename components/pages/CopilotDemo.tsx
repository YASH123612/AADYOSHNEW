"use client";

import { useEffect, useRef, useState } from "react";

const RESPONSES: Record<string, string> = {
  "Summarize my open feedback": "You have 2 open mentor notes: tighten error handling in your API project, and add tests for the auth flow.",
  "Course revision ideas": "Based on your last quiz, revisit async/await error handling and database indexing before your next session.",
  "Explain my last project feedback": "Your mentor rated the code quality strong but flagged the documentation — add setup instructions and inline comments to close the gap.",
  "What should I practice next?": "Your weakest area right now is system design fundamentals — try 2 code lab challenges on scaling before your next mock interview.",
  "Draft a mentor follow-up message": "Draft: \"Hi [Mentor], following up on your feedback — I've updated the auth flow and added tests. Could you take another look this week?\"",
  "Show my placement readiness": "You're at 68% readiness: strong on projects, still building toward consistent mock-interview scores above 7/10.",
};
const PROMPTS = Object.keys(RESPONSES);

const QUESTIONS = [
  "Tell me about a project where you had to optimize something for performance.",
  "How would you design the database schema for a course-and-cohort system?",
  "Walk me through how you'd debug a memory leak in a long-running service.",
  "What's a trade-off you made recently between speed and code quality?",
];
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

type Msg = { text: string; user: boolean };

/** The Copilot page demo: an assistant chat and a simulated AI mock interview (UI mock, no real audio or AI). */
export function CopilotDemo() {
  const [tab, setTab] = useState<"assistant" | "interview">("assistant");

  // assistant
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const say = (text: string, user: boolean) => setMsgs((m) => [...m, { text, user }]);
  const ask = (text: string) => { say(text, true); setTimeout(() => say(RESPONSES[text] ?? "Here's what I found — connect a real workspace to see live answers.", false), 450); };
  const send = () => {
    const val = draft.trim();
    if (!val) return;
    say(val, true);
    setDraft("");
    setTimeout(() => say("Got it — in the full product this connects to your real course and mentor data.", false), 450);
  };

  // interview
  const [phase, setPhase] = useState<"idle" | "live" | "done">("idle");
  const [q, setQ] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [final, setFinal] = useState({ q: 0, seconds: 0 });
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const start = () => {
    setPhase("live"); setQ(0); setSeconds(0);
    timer.current = setInterval(() => {
      setSeconds((s) => {
        const n = s + 1;
        if (n % 8 === 0) setQ((x) => (x + 1) % QUESTIONS.length);
        return n;
      });
    }, 1000);
  };
  const end = () => {
    if (timer.current) clearInterval(timer.current);
    setFinal({ q, seconds });
    setPhase("done");
  };

  return (
    <section className="copilot-demo">
      <div className="container">
        <div className="copilot-tabs" role="tablist" aria-label="Copilot demo">
          <button className={"copilot-tab" + (tab === "assistant" ? " active" : "")} id="tab-assistant" role="tab" aria-selected={tab === "assistant"} aria-controls="panel-assistant" onClick={() => setTab("assistant")}>
            <i className="fa-solid fa-comments" aria-hidden="true"></i> Assistant
          </button>
          <button className={"copilot-tab" + (tab === "interview" ? " active" : "")} id="tab-interview" role="tab" aria-selected={tab === "interview"} aria-controls="panel-interview" onClick={() => setTab("interview")}>
            <i className="fa-solid fa-microphone" aria-hidden="true"></i> AI Mock Interview
          </button>
        </div>

        <div className={"copilot-panel" + (tab === "assistant" ? " active" : "")} id="panel-assistant" role="tabpanel" aria-labelledby="tab-assistant">
          <div className="assistant-card">
            <div className="assistant-head">
              <div className="avatar-lg"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
              <h3>How can I help?</h3>
              <p>Ask about your courses, projects, mentors, or upcoming deadlines.</p>
            </div>
            <div className="prompt-grid">
              {PROMPTS.map((p) => <button key={p} className="prompt-chip" onClick={() => ask(p)}>{p}</button>)}
            </div>
            <div className="assistant-body">
              {msgs.map((m, i) => <div key={i} className={"chat-msg" + (m.user ? " user" : "")} style={{ maxWidth: "100%" }}>{m.text}</div>)}
            </div>
            <div className="assistant-foot">
              <input type="text" placeholder="Message aadyosh Copilot..." aria-label="Message aadyosh Copilot" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
              <button onClick={send} aria-label="Send message"><i className="fa-solid fa-paper-plane"></i></button>
            </div>
          </div>
        </div>

        <div className={"copilot-panel" + (tab === "interview" ? " active" : "")} id="panel-interview" role="tabpanel" aria-labelledby="tab-interview">
          <div className="interview-card">
            <div className="interview-top">
              <span className="tag">TECHNICAL · Full Stack Web Development</span>
              {phase === "live" && <span className="live" style={{ display: "flex" }}><span className="dot"></span> LIVE · <span>Q{q + 1}/{QUESTIONS.length}</span> · <span>{fmt(seconds)}</span></span>}
            </div>
            <div className="interview-stage">
              {phase === "idle" && (
                <div>
                  <div className="interview-avatar"><i className="fa-solid fa-robot"></i></div>
                  <p style={{ color: "var(--ink-300)", fontSize: 14, maxWidth: 420, margin: "0 auto 20px" }}>Start a short mock interview. The AI interviewer asks role-based questions and gives feedback at the end — mic access is simulated in this preview.</p>
                  <button className="btn btn-primary interview-start-btn" onClick={start}><i className="fa-solid fa-play"></i> Start mock interview</button>
                </div>
              )}
              {phase === "live" && (
                <div style={{ display: "block" }}>
                  <div className="interview-avatar"><div className="ring"></div><i className="fa-solid fa-robot"></i></div>
                  <div className="interview-status">Listening</div>
                  <div className="interview-wave"><span></span><span></span><span></span><span></span><span></span></div>
                  <div className="interview-caption">
                    <div className="who">Interviewer</div>
                    <p>{QUESTIONS[q]}</p>
                  </div>
                </div>
              )}
              {phase === "done" && (
                <div style={{ display: "block" }}>
                  <div className="interview-avatar"><i className="fa-solid fa-check"></i></div>
                  <div className="interview-status" style={{ marginBottom: 10 }}>Interview complete</div>
                  <p style={{ color: "var(--ink-300)", fontSize: 14, maxWidth: 420, margin: "0 auto 20px" }}>You answered {final.q + 1} of {QUESTIONS.length} questions in {fmt(final.seconds)}. In the full product you&apos;d get a detailed feedback report here.</p>
                  <button className="btn btn-primary interview-start-btn" onClick={() => setPhase("idle")}><i className="fa-solid fa-rotate-right"></i> Start another</button>
                </div>
              )}
            </div>
            {phase === "live" && (
              <div className="interview-controls" style={{ display: "flex" }}>
                <button className="active" aria-label="Mute microphone"><i className="fa-solid fa-microphone"></i></button>
                <button className="active" aria-label="Toggle captions">CC</button>
                <button aria-label="Toggle volume"><i className="fa-solid fa-volume-high"></i></button>
                <button className="end" onClick={end}>End interview</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
