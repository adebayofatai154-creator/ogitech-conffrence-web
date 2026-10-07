import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHeader, Section } from "@/components/site/Section";
import { ResearchCard } from "@/components/site/ResearchCard";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = {
  title: "Research Library",
  description: "Browse, view and download published research from the 2nd Hybrid International Conference, OGITECH School of Engineering Technology.",
  alternates: { canonical: "/research" },
};
export const revalidate = 60;

const PAGE_SIZE = 9;

export default async function ResearchLibraryPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string };
}) {
  const query = searchParams.q?.trim().slice(0, 100) ?? "";
  const page = Math.max(1, Number(searchParams.page ?? "1") || 1);

  const where = {
    status: "PUBLISHED" as const,
    slug: { not: null },
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { fullName: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [rows, total] = await Promise.all([
    prisma.researchSubmission.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: { slug: true, fullName: true, title: true, abstractText: true, category: true, publishedAt: true, fileUrl: true },
    }),
    prisma.researchSubmission.count({ where }),
  ]);

  const papers = rows.filter((p): p is typeof p & { slug: string } => p.slug !== null);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageHref = (n: number) => `/research?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(n) })}`;

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Research" }]}
        title="Published conference research"
        intro="View and download research works published from the 2nd Hybrid International Conference."
      />

      <Section labelledBy="library-title">
        <h2 id="library-title" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Research library</h2>
        <div className="s-toolbar">
          <form className="s-search" role="search" action="/research">
            <label htmlFor="q" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Search by title or author</label>
            <input id="q" type="text" name="q" defaultValue={query} placeholder="Search by title or author" />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <p className="s-count-text" aria-live="polite">
            {total === 0 ? "No results" : `${total} ${total === 1 ? "paper" : "papers"}`}
            {query ? ` for “${query}”` : ""}
          </p>
        </div>

        {papers.length === 0 ? (
          <EmptyState
            title="No research found"
            description={query ? "We couldn’t find any published research matching your search." : "No research has been published yet. Please check back after the review process."}
          />
        ) : (
          <>
            <ul className="s-rgrid">
              {papers.map((p) => (
                <li key={p.slug}><ResearchCard paper={p} /></li>
              ))}
            </ul>
            {totalPages > 1 && (
              <nav className="s-pager" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Link key={n} href={pageHref(n)} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`}>{n}</Link>
                ))}
              </nav>
            )}
          </>
        )}
      </Section>
    </>
  );
}
