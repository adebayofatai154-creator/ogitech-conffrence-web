import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminOverviewPage() {
  const [total, submitted, underReview, approved, published, recent] = await Promise.all([
    prisma.researchSubmission.count(),
    prisma.researchSubmission.count({ where: { status: "SUBMITTED" } }),
    prisma.researchSubmission.count({ where: { status: "UNDER_REVIEW" } }),
    prisma.researchSubmission.count({ where: { status: "APPROVED" } }),
    prisma.researchSubmission.count({ where: { status: "PUBLISHED" } }),
    prisma.researchSubmission.findMany({
      orderBy: { submittedAt: "desc" },
      take: 6,
      select: { id: true, fullName: true, title: true, status: true, submittedAt: true },
    }),
  ]);

  return (
    <>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Overview</h1>

      <div className="grid-cards g4" style={{ marginBottom: 32 }}>
        <div className="stat-card"><div className="bar" /><div className="num">{total}</div><div className="lbl">Total Submissions</div></div>
        <div className="stat-card"><div className="bar" style={{ background: "var(--warn)" }} /><div className="num">{submitted + underReview}</div><div className="lbl">Pending Review</div></div>
        <div className="stat-card"><div className="bar" style={{ background: "var(--success)" }} /><div className="num">{approved}</div><div className="lbl">Approved</div></div>
        <div className="stat-card"><div className="bar" style={{ background: "var(--navy)" }} /><div className="num">{published}</div><div className="lbl">Published</div></div>
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 14 }}>Recent submissions</h2>
      {recent.length === 0 ? (
        <EmptyState title="No submissions yet" description="Researcher submissions will appear here as they come in." />
      ) : (
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Researcher</th><th>Title</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {recent.map((s) => (
                <tr key={s.id}>
                  <td>{s.fullName}</td>
                  <td>{s.title ?? <span style={{ color: "var(--muted)" }}>Untitled</span>}</td>
                  <td>{s.submittedAt.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td><Link href={`/admin/submissions/${s.id}`} style={{ fontWeight: 600, fontSize: 13 }}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
