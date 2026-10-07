import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/components/ui/EmptyState";

export default async function AdminResearchPage() {
  const papers = await prisma.researchSubmission.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <h1 style={{ fontSize: 22, marginBottom: 20 }}>Published Research</h1>
      {papers.length === 0 ? (
        <EmptyState title="No published research yet" description="Publish an approved submission to see it listed here." />
      ) : (
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Title</th><th>Author</th><th>Published</th><th></th></tr></thead>
            <tbody>
              {papers.map((p) => (
                <tr key={p.id}>
                  <td>{p.title ?? "Untitled"}</td>
                  <td>{p.fullName}</td>
                  <td>{p.publishedAt?.toLocaleDateString("en-NG", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td style={{ display: "flex", gap: 16 }}>
                    <a href={`/research/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 13 }}>Open public page</a>
                    <a href={p.fileUrl} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 13 }}>Download</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
