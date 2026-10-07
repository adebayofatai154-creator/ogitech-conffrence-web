"use client";

// Last-resort boundary: replaces the root layout, so it renders its own <html>
// and cannot rely on global CSS — styles are inline.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#F7F8FC", color: "#172033" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24, textAlign: "center" }}>
          <div style={{ maxWidth: 440 }}>
            <h1 style={{ fontSize: 28, color: "#03055A", margin: "0 0 12px" }}>Something went wrong</h1>
            <p style={{ lineHeight: 1.7, color: "#4A5468", margin: "0 0 24px" }}>
              The conference website hit an unexpected problem. Please try again.
            </p>
            <button onClick={reset} style={{ background: "#03055A", color: "#fff", border: 0, padding: "14px 26px", fontWeight: 700, borderRadius: 8, cursor: "pointer", marginRight: 12 }}>Try Again</button>
            <a href="/" style={{ color: "#050399", fontWeight: 700 }}>Back to Home</a>
          </div>
        </main>
      </body>
    </html>
  );
}
