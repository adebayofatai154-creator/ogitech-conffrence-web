"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateSubmissionStatus } from "@/app/admin/actions";
import type { SubmissionStatus } from "@prisma/client";

export function SubmissionActions({ id, status }: { id: string; status: SubmissionStatus }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmingPublish, setConfirmingPublish] = useState(false);
  const [confirmingReject, setConfirmingReject] = useState(false);

  function apply(next: SubmissionStatus) {
    startTransition(async () => {
      await updateSubmissionStatus(id, next);
      setConfirmingPublish(false);
      setConfirmingReject(false);
      router.refresh();
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {status !== "UNDER_REVIEW" && status !== "PUBLISHED" && (
        <button className="btn btn-outline" onClick={() => apply("UNDER_REVIEW")} disabled={isPending}>Mark Under Review</button>
      )}
      {status !== "APPROVED" && status !== "PUBLISHED" && (
        <button className="btn btn-secondary" onClick={() => apply("APPROVED")} disabled={isPending}>Approve</button>
      )}
      {status !== "REJECTED" && status !== "PUBLISHED" && (
        <button className="btn btn-destructive" onClick={() => setConfirmingReject(true)} disabled={isPending}>Reject</button>
      )}
      {status !== "PUBLISHED" && (
        <button className="btn btn-primary" onClick={() => setConfirmingPublish(true)} disabled={isPending}>Approve &amp; Publish</button>
      )}
      {status === "PUBLISHED" && <span className="badge badge-PUBLISHED"><span className="d" />Live on the public research library</span>}

      {confirmingPublish && (
        <div className="mobile-drawer" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setConfirmingPublish(false)}>
          <div className="card" style={{ maxWidth: 380, padding: 28 }} onClick={(e) => e.stopPropagation()}>
            <h4 style={{ fontSize: 17, marginBottom: 10 }}>Publish this research?</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 22 }}>It will become publicly visible on the conference research library immediately.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setConfirmingPublish(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => apply("PUBLISHED")} disabled={isPending}>
                {isPending ? (<><span className="spinner" />Publishing…</>) : "Publish"}
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmingReject && (
        <div className="mobile-drawer" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setConfirmingReject(false)}>
          <div className="card" style={{ maxWidth: 380, padding: 28, borderTop: "4px solid var(--error)" }} onClick={(e) => e.stopPropagation()}>
            <h4 style={{ fontSize: 17, marginBottom: 10 }}>Reject submission?</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 22 }}>This cannot be undone from this screen. The researcher's work will remain on file but marked rejected.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="btn btn-ghost" onClick={() => setConfirmingReject(false)}>Cancel</button>
              <button className="btn btn-destructive" onClick={() => apply("REJECTED")} disabled={isPending}>
                {isPending ? (<><span className="spinner" />Rejecting…</>) : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
