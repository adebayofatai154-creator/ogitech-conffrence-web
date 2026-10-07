"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function PublicError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="s-status">
      <div className="s-container">
        <p className="s-status__code" aria-hidden="true">!</p>
        <h1>Something went wrong</h1>
        <p>We couldn’t load this page. Please try again, or head back to the conference homepage.</p>
        <div className="s-status__cta">
          <button type="button" onClick={reset} className="btn btn-primary btn-lg">Try Again</button>
          <Link href="/" className="btn btn-outline btn-lg">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
