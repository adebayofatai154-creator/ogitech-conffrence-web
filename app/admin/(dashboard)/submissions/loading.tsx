export default function Loading() {
  return (
    <div className="tbl-wrap" aria-hidden="true">
      <div style={{ padding: 20 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 16, marginBottom: 14, width: `${80 - i * 4}%` }} />
        ))}
      </div>
    </div>
  );
}
