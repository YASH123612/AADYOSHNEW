"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";
import { RoadmapModal } from "./RoadmapModal";
import { MentorModal } from "./MentorModal";

export type MentorContext = { program: string; domain: string };

type Modals = {
  openRoadmap: (trigger?: HTMLElement | null) => void;
  openMentor: (ctx: MentorContext, trigger?: HTMLElement | null) => void;
};
const ModalCtx = createContext<Modals | null>(null);

export function useModals(): Modals {
  const m = useContext(ModalCtx);
  if (!m) throw new Error("useModals must be used inside <ModalProvider>");
  return m;
}

/** Owns the two pop-up forms so any button on any page can open them. */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [roadmapOpen, setRoadmapOpen] = useState(false);
  const [mentorOpen, setMentorOpen] = useState(false);
  const [mentorCtx, setMentorCtx] = useState<MentorContext>({ program: "", domain: "" });
  const roadmapTrigger = useRef<HTMLElement | null>(null);
  const mentorTrigger = useRef<HTMLElement | null>(null);

  const openRoadmap = useCallback((trigger?: HTMLElement | null) => {
    roadmapTrigger.current = trigger ?? (document.activeElement as HTMLElement | null);
    setRoadmapOpen(true);
  }, []);
  const openMentor = useCallback((ctx: MentorContext, trigger?: HTMLElement | null) => {
    mentorTrigger.current = trigger ?? (document.activeElement as HTMLElement | null);
    setMentorCtx(ctx);
    setMentorOpen(true);
  }, []);

  const value = useMemo(() => ({ openRoadmap, openMentor }), [openRoadmap, openMentor]);
  const autoOpenRoadmap = useCallback(() => openRoadmap(null), [openRoadmap]);
  const closeRoadmap = useCallback(() => { setRoadmapOpen(false); roadmapTrigger.current?.focus(); roadmapTrigger.current = null; }, []);
  const closeMentor = useCallback(() => { setMentorOpen(false); mentorTrigger.current?.focus(); mentorTrigger.current = null; }, []);

  return (
    <ModalCtx.Provider value={value}>
      {children}
      <RoadmapModal open={roadmapOpen} onClose={closeRoadmap} onOpenRequest={autoOpenRoadmap} />
      <MentorModal open={mentorOpen} ctx={mentorCtx} onClose={closeMentor} />
    </ModalCtx.Provider>
  );
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">;

/** "Talk to a Mentor" button: opens the general roadmap pop-up form (the href is only a no-JavaScript fallback). */
export function TalkLink({ href = "/#faq", ...props }: LinkProps) {
  const { openRoadmap } = useModals();
  return <a href={href} {...props} onClick={(e) => { e.preventDefault(); openRoadmap(e.currentTarget); }} />;
}

/** "Talk to a Mentor" button on a program page: opens the form pre-filled for that program and domain. */
export function MentorLink({ program, domain, href = "/#faq", ...props }: LinkProps & MentorContext) {
  const { openMentor } = useModals();
  return <a href={href} {...props} onClick={(e) => { e.preventDefault(); openMentor({ program, domain }, e.currentTarget); }} />;
}
