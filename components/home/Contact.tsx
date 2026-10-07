import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Section } from "@/components/site/Section";

export function Contact() {
  const c = siteConfig.contact;
  return (
    <Section id="contact" tone="off" labelledBy="contact-title">
      <div className="s-head">
        <div>
          <Eyebrow n="12">Contact</Eyebrow>
          <h2 id="contact-title" className="s-title">Conference secretariat</h2>
        </div>
        <p className="s-lead">For enquiries about submissions, registration or accommodation, contact the conference secretariat.</p>
      </div>
      <div className="s-contact">
        <div className="s-contact__item">
          <p className="s-contact__k">Conference email</p>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </div>
        <div className="s-contact__item">
          <p className="s-contact__k">Chairman</p>
          <p className="s-contact__name">{c.chairmanName}</p>
          <p className="s-contact__role">Chairman, SET Research, Innovation &amp; Publication</p>
          <a href={`tel:${c.chairmanPhone}`}>{c.chairmanPhone}</a>
        </div>
        <div className="s-contact__item">
          <p className="s-contact__k">Secretary</p>
          <p className="s-contact__name">{c.secretaryName}</p>
          <p className="s-contact__role">Secretary, SET Research, Innovation &amp; Publication</p>
          <a href={`tel:${c.secretaryPhone}`}>{c.secretaryPhone}</a>
        </div>
      </div>
    </Section>
  );
}
