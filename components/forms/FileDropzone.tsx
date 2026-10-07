"use client";

import { useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const ACCEPTED = ".pdf,.doc,.docx";

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.ceil(bytes / 1024))} KB`;
}

export function FileDropzone({
  file, onChange, error, disabled,
}: { file: File | null; onChange: (file: File | null) => void; error?: string; disabled?: boolean }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const errId = useId();

  const pick = (files: FileList | null) => { if (files && files[0]) onChange(files[0]); };
  const input = (
    <input ref={inputRef} type="file" accept={ACCEPTED} hidden disabled={disabled} onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
  );

  if (file) {
    return (
      <div className="s-file">
        <div className="s-file__info">
          <span className="s-file__icon" aria-hidden="true" />
          <div style={{ minWidth: 0 }}>
            <p className="s-file__name">{file.name}</p>
            <p className="s-file__meta">{formatSize(file.size)} · {file.type || "Unknown type"}</p>
          </div>
        </div>
        <div className="s-file__actions">
          <button type="button" className="btn btn-ghost" disabled={disabled} onClick={() => inputRef.current?.click()}>Replace</button>
          <button type="button" className="btn btn-ghost" disabled={disabled} style={{ color: "var(--error)" }} onClick={() => onChange(null)}>Remove</button>
        </div>
        {input}
      </div>
    );
  }

  return (
    <>
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""} ${error ? "has-error" : ""}`}
        role="button"
        tabIndex={0}
        aria-describedby={error ? errId : undefined}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); pick(e.dataTransfer.files); }}
      >
        <strong>Upload your abstract or full paper</strong>
        <span>Drag and drop a file here, or tap to browse</span>
        <span>PDF preferred (Word accepted) · max {siteConfig.maxUploadMb} MB</span>
      </div>
      {error && <p id={errId} role="alert" className="hint" style={{ color: "var(--error)", marginTop: 8, fontSize: 14 }}>{error}</p>}
      {input}
    </>
  );
}
