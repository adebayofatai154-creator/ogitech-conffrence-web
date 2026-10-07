import type { Metadata } from "next";
import { SubmissionForm } from "@/components/forms/SubmissionForm";
import { PageHeader, Section } from "@/components/site/Section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Submit Your Research",
  description: "Submit your abstract or complete research work for consideration at the 2nd Hybrid International Conference, School of Engineering Technology, OGITECH.",
  alternates: { canonical: "/submit" },
};

export default function SubmitPage() {
  const r = siteConfig.paperRequirements;
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Submit Paper" }]}
        title="Submit your research"
        intro={`Submit your abstract or complete research work for consideration at the 2nd Hybrid International Conference, organised by the ${siteConfig.school}, ${siteConfig.institution}.`}
      />
      <Section tone="off" labelledBy="guidelines-title">
        <div className="s-submit">
          <aside className="s-submit__aside" id="requirements">
            <h2 id="guidelines-title">Before you submit</h2>
            <dl>
              <div className="s-req s-req--quote" style={{ gridTemplateColumns: "1fr" }}>
                <dt>Full paper</dt>
                <dd>Electronic copy of FULL PAPER should not be more than 10 pages set in double-space, 12 point, Times New Roman, line spacing 1.5.</dd>
              </div>
              <div className="s-req" style={{ gridTemplateColumns: "1fr" }}><dt>Referencing</dt><dd>{r.referencing}</dd></div>
              <div className="s-req" style={{ gridTemplateColumns: "1fr" }}><dt>Presentation</dt><dd>{r.presentation}</dd></div>
              <div className="s-req" style={{ gridTemplateColumns: "1fr" }}><dt>Plagiarism</dt><dd>{r.plagiarism}<p className="s-note">All papers are subjected to a plagiarism test.</p></dd></div>
            </dl>
            <p className="s-subhead" style={{ marginTop: 24 }}>Deadlines</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {siteConfig.importantDates.filter((d) => d.kind === "deadline").map((d) => (
                <li key={d.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderTop: "1px solid var(--border)", fontSize: 15 }}>
                  <span>{d.label}</span><strong style={{ fontFamily: "var(--font-h)", whiteSpace: "nowrap" }}>{d.day} {d.month.slice(0, 3)} {d.year}</strong>
                </li>
              ))}
            </ul>
          </aside>
          <SubmissionForm />
        </div>
      </Section>
    </>
  );
}
