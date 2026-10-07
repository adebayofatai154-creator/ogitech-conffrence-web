import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SubmissionActions } from "@/components/admin/SubmissionActions";
import { MetadataEditor } from "@/components/admin/MetadataEditor";

export default async function AdminSubmissionDetailPage({ params }: { params: { id: string } }) {
  const submission = await prisma.researchSubmission.findUnique({ where: { id: params.id } });
  if (!submission) notFound();

  function formatSize(bytes: number) {
    return bytes > 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24 }}>
      <div>
        <div className="card" style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 18, marginBottom: 16 }}>Researcher</h1>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, fontSize: 14 }}>
            <div><div style={{ color: "var(--muted)", fontSize: 12 }}>Full name</div><strong>{submission.fullName}</strong></div>
            <div><div style={{ color: "var(--muted)", fontSize: 12 }}>Email</div><strong>{submission.email}</strong></div>
            <div><div style={{ color: "var(--muted)", fontSize: 12 }}>Phone</div><strong>{submission.phoneNumber}</strong></div>
            <div><div style={{ color: "var(--muted)", fontSize: 12 }}>Submitted</div><strong>{submission.submittedAt.toLocaleString("en-NG")}</strong></div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Document</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{submission.fileName}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{formatSize(submission.fileSize)} · {submission.fileType}</div>
            </div>
            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Download</a>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16, marginBottom: 16 }}>Publication details</h2>
          <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>
            Fill these in before publishing — they populate the public research page.
          </p>
          <MetadataEditor
            id={submission.id}
            title={submission.title ?? ""}
            abstractText={submission.abstractText ?? ""}
            category={submission.category ?? ""}
            keywords={submission.keywords}
          />
        </div>
      </div>

      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Current status</span>
            <StatusBadge status={submission.status} />
          </div>
          <SubmissionActions id={submission.id} status={submission.status} />
        </div>
        {submission.slug && (
          <a href={`/research/${submission.slug}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>
            View public page →
          </a>
        )}
      </div>
    </div>
  );
}
