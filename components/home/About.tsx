import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function About({ numbered = true }: { numbered?: boolean }) {
  return (
    <Section id="about" tone="off" labelledBy="about-title">
      <div className="s-about__grid">
        <div className="s-about__sticky">
          <Eyebrow n={numbered ? "02" : undefined}>
            About the Conference
          </Eyebrow>
          <h2 id="about-title" className="s-title">
            Why this conference matters
          </h2>
        </div>
        <div>
          <div className="s-prose">
            <p>
              Technical and vocational education and training (TVET) sits at the
              centre of Nigeria’s industrial ambitions. Engineering
              technologists and technicians turn designs into working systems in
              manufacturing, construction, energy, automation and digital
              infrastructure and the quality of their training shapes the
              country’s capacity to compete.
            </p>
            <p>
              This conference provides a forum to examine that link: how
              engineering TVET can be repositioned to meet the needs of
              industry, embrace Industry 4.0 and digital transformation, and
              develop globally competitive skills.
            </p>
            <p>
              Through research presentations, keynote and lead addresses, and
              conversation across academia and industry, participants share
              research, practice and ideas that can strengthen Nigeria’s
              engineering and technical education ecosystem.
            </p>
          </div>

          <h3 className="s-subhead">Focus areas</h3>
          <ul className="s-focus">
            {siteConfig.focusAreas.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <h3 className="s-subhead">Who should attend</h3>
          <ul className="s-chips">
            {siteConfig.attendees.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
