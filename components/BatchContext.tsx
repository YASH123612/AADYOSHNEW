"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { batchLabel, countdownText, nextMonthlyStart } from "@/lib/batch";

type Batch = { date: Date; label: string };
const BatchCtx = createContext<Batch | null>(null);

/**
 * The "Next batch" date. The server passes its best answer in (so the first paint matches the HTML); once mounted we
 * recompute it from the visitor's clock (correct even if this page was cached for days) and then ask /api/next-batch,
 * which is the authoritative source (it honours BATCH_DAY / BATCH_DATE).
 */
export function BatchProvider({ initialIso, children }: { initialIso: string; children: ReactNode }) {
  const [batch, setBatch] = useState<Batch>(() => {
    const date = new Date(initialIso);
    return { date, label: batchLabel(date) };
  });

  useEffect(() => {
    const apply = (date: Date) => setBatch({ date, label: batchLabel(date) });
    apply(nextMonthlyStart(new Date()));
    let cancelled = false;
    fetch("/api/next-batch", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("status " + r.status))))
      .then((j: { start?: string }) => {
        const d = new Date(j.start ?? "");
        if (!cancelled && !isNaN(d.getTime()) && d > new Date()) apply(d);
      })
      .catch(() => { /* keep the locally computed date */ });
    return () => { cancelled = true; };
  }, []);

  return <BatchCtx.Provider value={batch}>{children}</BatchCtx.Provider>;
}

export function useBatch(): Batch {
  const b = useContext(BatchCtx);
  if (!b) throw new Error("useBatch must be used inside <BatchProvider>");
  return b;
}

/** "10 Nov" */
export function BatchLabel() {
  const { label } = useBatch();
  return <b suppressHydrationWarning>{label}</b>;
}

/** "15d 23h 51m", refreshed every 30 seconds */
export function BatchCountdown({ className }: { className?: string }) {
  const { date } = useBatch();
  const [text, setText] = useState(() => countdownText(date));
  useEffect(() => {
    const tick = () => setText(countdownText(date));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [date]);
  return <b className={className} suppressHydrationWarning>{text}</b>;
}
