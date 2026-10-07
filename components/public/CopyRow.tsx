"use client";

import { useState } from "react";

export function CopyRow({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be unavailable (permissions / insecure context). The number stays visible to copy by hand.
    }
  }

  return (
    <div className="copy-row">
      <span>{value}</span>
      <button type="button" className="btn btn-outline" onClick={handleCopy} aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
