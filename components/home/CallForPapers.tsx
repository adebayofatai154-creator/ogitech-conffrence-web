import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function CallForPapers({ numbered = true }: { numbered?: boolean }) {
  const r = siteConfig.paperRequirements;
  return (
    <Section id="call-for-papers" tone="off" labelledBy="cfp-title">
      <div className="s-cfp">
        <div className="s-cfp__lead">
          <Eyebrow n={numbered ? "06" : undefined} light>Call for Papers</Eyebrow>
          <h2 id="cfp-title" className="s-title s-title--light">Submit your abstract or complete work</h2>
          <p>
            Researchers, academics, engineers, students and relevant professionals are invited to submit research work
            related to the conference theme and sub-themes.
          </p>
          <ul className="s-cfp__kinds">
            <li>Abstract</li>
            <li>Complete work</li>
          </ul>
          <Link href={siteConfig.submitHref} className="btn btn-accent btn-lg">Submit Paper</Link>
        </div>

        <dl className="s-cfp__reqs">
          <div className="s-req s-req--quote">
            <dt>Full paper</dt>
            <dd>Electronic copy of FULL PAPER should not be more than 10 pages set in double-space, 12 point, Times New Roman, line spacing 1.5.</dd>
          </div>
          <div className="s-req"><dt>Referencing</dt><dd>{r.referencing}</dd></div>
          <div className="s-req"><dt>Presentation</dt><dd>{r.presentation}</dd></div>
          <div className="s-req">
            <dt>Plagiarism</dt>
            <dd>
              {r.plagiarism}
              <p className="s-note">All papers submitted are subjected to a plagiarism test. Meeting the threshold does not guarantee acceptance.</p>
            </dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
