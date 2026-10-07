import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function Intro() {
  return (
    <Section id="conference" labelledBy="intro-title">
      <div className="s-split">
        <div>
          <Eyebrow n="01">The Conference</Eyebrow>
          <h2 id="intro-title" className="s-intro__title">
            Repositioning engineering TVET for a <em>competitive Nigeria.</em>
          </h2>
        </div>
        <div>
          <div className="s-prose">
            <p>
              The 2nd Hybrid International Conference is organised by the{" "}
              {siteConfig.school} of {siteConfig.institution} (OGITECH). It
              brings together researchers, academics, engineers, students,
              industry professionals and TVET stakeholders in person at Igbesa
              and online to examine how engineering technical and vocational
              education can drive industrial development and global
              competitiveness in Nigeria.
            </p>
          </div>
          <dl className="s-facts">
            <div>
              <dt>Edition</dt>
              <dd>2nd Hybrid International Conference</dd>
            </div>
            <div>
              <dt>Organiser</dt>
              <dd>{siteConfig.school}</dd>
            </div>
            <div>
              <dt>Institution</dt>
              <dd>{siteConfig.institution}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>Physical + Virtual</dd>
            </div>
            <div>
              <dt>Theme</dt>
              <dd>“{siteConfig.theme}”</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
