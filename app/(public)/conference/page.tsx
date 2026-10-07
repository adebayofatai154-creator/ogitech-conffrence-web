import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHeader, Eyebrow, Section } from "@/components/site/Section";
import { About } from "@/components/home/About";
import { Objectives } from "@/components/home/Objectives";
import { SubThemes } from "@/components/home/SubThemes";
import { CallForPapers } from "@/components/home/CallForPapers";
import { Dates } from "@/components/home/Dates";
import { Venue } from "@/components/home/Venue";
import { Accommodation } from "@/components/home/Accommodation";

export const metadata: Metadata = {
  title: "Conference",
  description: `Full conference information: theme, objectives, ${siteConfig.subThemes.length} sub-themes, paper requirements, important dates, venue and accommodation.`,
  alternates: { canonical: "/conference" },
};

export default function ConferencePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Conference" }]}
        title="Conference information"
        intro={`2nd Hybrid International Conference — “${siteConfig.theme}”`}
      />

      <Section labelledBy="facts-title">
        <Eyebrow>At a glance</Eyebrow>
        <h2 id="facts-title" className="s-title" style={{ marginBottom: 32 }}>Key facts</h2>
        <dl className="s-keyfacts">
          <div><dt>Conference</dt><dd>{siteConfig.conferenceTitle}</dd></div>
          <div><dt>Dates</dt><dd>{siteConfig.dates}</dd></div>
          <div><dt>Venue</dt><dd>{siteConfig.venueName}, {siteConfig.venueLocation}</dd></div>
          <div><dt>Format</dt><dd>Physical + Virtual</dd></div>
          <div><dt>Organiser</dt><dd>{siteConfig.school}</dd></div>
          <div><dt>Institution</dt><dd>{siteConfig.institution}</dd></div>
          <div><dt>Who should attend</dt><dd>{siteConfig.attendees.join(", ")}</dd></div>
        </dl>
      </Section>

      <About numbered={false} />
      <Objectives numbered={false} />
      <SubThemes numbered={false} />
      <CallForPapers numbered={false} />
      <Dates numbered={false} />
      <Venue numbered={false} />
      <Accommodation numbered={false} />
    </>
  );
}
