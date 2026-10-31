"use client";

import { useCallback, useState } from "react";

/** POSTs a form to /api/<endpoint> and reports pending / error state. Resolves true when the server accepted it. */
export function useSubmit(endpoint: string) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const submit = useCallback(async (payload: Record<string, unknown>): Promise<boolean> => {
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/" + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: location.pathname }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      if (!res.ok) {
        const first = data.fields && Object.values(data.fields)[0];
        throw new Error(first || data.error || "Something went wrong.");
      }
      return true;
    } catch (err) {
      setError(err instanceof TypeError ? "Couldn't reach the server. Check your connection and try again." : (err as Error).message);
      return false;
    } finally {
      setPending(false);
    }
  }, [endpoint]);

  return { submit, pending, error };
}

/** The honeypot field: invisible to people, tempting to bots. The API drops submissions where it is filled. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      name="fax"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
    />
  );
}
