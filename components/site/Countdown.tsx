"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ start, end }: { start: string; end: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const startMs = Date.parse(start);
  const endMs = Date.parse(end);

  if (now !== null && now >= startMs) {
    return <p className="s-count-note">{now <= endMs ? "The conference is now in session" : "The conference has concluded"}</p>;
  }

  const diff = now === null ? null : Math.max(0, startMs - now);
  const units = [
    { label: "Days", value: diff === null ? "--" : String(Math.floor(diff / 86_400_000)) },
    { label: "Hours", value: diff === null ? "--" : pad(Math.floor((diff % 86_400_000) / 3_600_000)) },
    { label: "Min", value: diff === null ? "--" : pad(Math.floor((diff % 3_600_000) / 60_000)) },
    { label: "Sec", value: diff === null ? "--" : pad(Math.floor((diff % 60_000) / 1000)) },
  ];

  return (
    <div className="s-count" role="timer" aria-label="Time remaining until the conference begins">
      {units.map((u) => (
        <div className="s-count__unit" key={u.label}>
          <span className="s-count__num">{u.value}</span>
          <span className="s-count__lbl">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
