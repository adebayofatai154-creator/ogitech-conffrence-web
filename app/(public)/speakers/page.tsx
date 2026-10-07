import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/site/Section";
import { SpeakerProfiles } from "@/components/home/Speakers";

export const metadata: Metadata = {
  title: "Speakers",
  description: "Conference hosts, keynote speaker and lead speaker of the 2nd Hybrid International Conference, OGITECH School of Engineering Technology.",
  alternates: { canonical: "/speakers" },
};

export default function SpeakersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Speakers" }]}
        title="Conference hosts and speakers"
        intro="The leadership and invited speakers of the 2nd Hybrid International Conference."
      />
      <Section labelledBy="speakers-page-title">
        <h2 id="speakers-page-title" className="s-title" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Speaker profiles</h2>
        <SpeakerProfiles />
      </Section>
    </>
  );
}
