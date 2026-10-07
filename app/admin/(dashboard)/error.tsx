"use client";

import { useEffect } from "react";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="card" style={{ maxWidth: 460, margin: "40px auto", textAlign: "center", padding: 32 }}>
      <h1 style={{ fontSize: 18, marginBottom: 10 }}>Something went wrong</h1>
      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 22 }}>
        This admin action couldn&apos;t be completed. Please try again.
      </p>
      <button onClick={reset} className="btn btn-primary">Try Again</button>
    </div>
  );
}
