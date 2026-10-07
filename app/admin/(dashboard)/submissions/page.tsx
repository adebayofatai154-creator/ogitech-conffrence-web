import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import type { SubmissionStatus } from "@prisma/client";

const PAGE_SIZE = 12;
const STATUSES: SubmissionStatus[] = ["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "PUBLISHED"];

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: { q?: string; status?: string; page?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const status = searchParams.status as SubmissionStatus | undefined;
  const page = Math.max(1, Number(searchParams.page ?? "1") || 1);

  const where = {
    ...(status && STATUSES.includes(status) ? { status } : {}),
    ...(query
      ? { OR: [
          { fullName: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
        ] }
      : {}),
  };

  const [submissions, total] = await Promise.all([
    prisma.researchSubmission.findMany({
      where, orderBy: { submittedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE, take: PAGE_SIZE,
    }),
    prisma.researchSubmission.count({ where }),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Submissions</h1>

      <form style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <input type="text" name="q" defaultValue={query} placeholder="Search name or email" style={{ maxWidth: 260 }} />
        <select name="status" defaultValue={status ?? ""}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
        </select>
        <button type="submit" className="btn btn-outline">Filter</button>
      </form>

      {submissions.length === 0 ? (
        <EmptyState title="No submissions found" description="Try a different search term or status filter." />
      ) : (
        <>
          <div className="tbl-wrap">
            <table>
              <thead><tr><th>Researcher</th><th>Email</th><th>Phone</th><th>Submitted</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.fullName}</td>
                    <td>{s.email}</td>
                    <td>{s.phoneNumber}</td>
                    <td>{s.submittedAt.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</td>
                    <td><StatusBadge status={s.status} /></td>
                    <td><Link href={`/admin/submissions/${s.id}`} style={{ fontWeight: 600, fontSize: 13 }}>View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={`/admin/submissions?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(status ? { status } : {}), page: String(n) })}`}
                  className="btn" style={{ minHeight: 36, padding: "6px 14px", background: n === page ? "var(--navy)" : "#fff", color: n === page ? "#fff" : "var(--text)", border: "1px solid var(--border)" }}>
                  {n}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
