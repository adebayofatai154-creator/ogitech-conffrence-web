export default function Loading() {
  return (
    <div className="grid-cards g4" aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="stat-card">
          <div className="skeleton" style={{ height: 12, width: "40%", marginBottom: 14 }} />
          <div className="skeleton" style={{ height: 26, width: "60%" }} />
        </div>
      ))}
    </div>
  );
}
