import Link from "next/link";
import { formatDate, toDownloadUrl } from "@/lib/utils";
import { IconArrow } from "./Icons";

export type ResearchCardData = {
  slug: string;
  fullName: string;
  title: string | null;
  publishedAt: Date | null;
  abstractText: string | null;
  category: string | null;
  fileUrl: string;
};

export function ResearchCard({ paper }: { paper: ResearchCardData }) {
  return (
    <article className="s-rcard">
      {paper.category && <p className="s-rcard__cat">{paper.category}</p>}
      <h3><Link href={`/research/${paper.slug}`}>{paper.title ?? "Untitled research submission"}</Link></h3>
      <p className="s-meta">{paper.fullName}{paper.publishedAt ? ` · ${formatDate(paper.publishedAt)}` : ""}</p>
      <p className="s-rcard__ex">{paper.abstractText ?? "Open the research page to view the full document."}</p>
      <div className="s-rcard__links">
        <Link href={`/research/${paper.slug}`} className="s-link">View research <IconArrow /></Link>
        <a href={toDownloadUrl(paper.fileUrl)} className="s-link">Download PDF</a>
      </div>
    </article>
  );
}
