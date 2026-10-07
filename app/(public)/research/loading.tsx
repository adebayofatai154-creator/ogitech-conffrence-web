export default function Loading() {
  return (
    <div className="s-section" role="status" aria-label="Loading research">
      <div className="s-container">
        <div className="skeleton" style={{ height: 44, maxWidth: 480, marginBottom: 32 }} />
        <ul className="s-rgrid" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i}>
              <div className="s-rcard">
                <div className="skeleton" style={{ height: 12, width: "40%", marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 20, width: "90%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 14, width: "60%", marginBottom: 24 }} />
                <div className="skeleton" style={{ height: 12, width: "100%", marginBottom: 8 }} />
                <div className="skeleton" style={{ height: 12, width: "80%" }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
