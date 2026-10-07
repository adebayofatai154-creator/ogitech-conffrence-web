export default function Loading() {
  return (
    <div className="s-section" role="status" aria-label="Loading">
      <div className="s-container s-skel">
        <div className="skeleton" style={{ height: 14, width: 140 }} />
        <div className="skeleton" style={{ height: 44, width: "70%" }} />
        <div className="skeleton" style={{ height: 44, width: "50%" }} />
        <div className="skeleton" style={{ height: 16, width: "85%", marginTop: 16 }} />
        <div className="skeleton" style={{ height: 16, width: "75%" }} />
        <span className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Loading…</span>
      </div>
    </div>
  );
}
