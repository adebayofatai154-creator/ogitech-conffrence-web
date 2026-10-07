"use client";

import Link from "next/link";
import { useEffect } from "react";

// Route-level boundary for anything outside the (public)/admin groups.
export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <main className="s-status">
      <div className="s-container">
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred while loading this page. You can try again, or return to the conference homepage.</p>
        <div className="s-status__cta">
          <button type="button" onClick={reset} className="btn btn-primary btn-lg">Try Again</button>
          <Link href="/" className="btn btn-outline btn-lg">Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
