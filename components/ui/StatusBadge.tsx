import type { SubmissionStatus } from "@prisma/client";

const LABELS: Record<SubmissionStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  PUBLISHED: "Published",
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return (
    <span className={`badge badge-${status}`}>
      <span className="d" />
      {LABELS[status]}
    </span>
  );
}
