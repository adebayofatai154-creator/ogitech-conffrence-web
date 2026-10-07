import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/Hero";
// import { Highlights } from "@/components/home/Highlights";
import { Intro } from "@/components/home/Intro";
import { About } from "@/components/home/About";
import { ThemeBand, Objectives } from "@/components/home/Objectives";
import { SubThemes } from "@/components/home/SubThemes";
import { SpeakersSection } from "@/components/home/Speakers";
import { CallForPapers } from "@/components/home/CallForPapers";
import { Dates } from "@/components/home/Dates";
import { RegistrationSection } from "@/components/home/Registration";
import { Accommodation } from "@/components/home/Accommodation";
import { ResearchPreview } from "@/components/home/ResearchPreview";
import { Venue } from "@/components/home/Venue";
import { Contact } from "@/components/home/Contact";
import { FinalCta } from "@/components/home/FinalCta";

export const revalidate = 60;

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.conferenceTitle} | ${siteConfig.school}, ${siteConfig.institutionShort}`,
  },
  description: `${siteConfig.conferenceTitle} — ${siteConfig.theme}. ${siteConfig.dates} at ${siteConfig.venueName}, ${siteConfig.venueLocation}. Physical and virtual attendance. Call for papers, registration and speakers.`,
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

async function getLatestResearch() {
  try {
    const rows = await prisma.researchSubmission.findMany({
      where: { status: "PUBLISHED", slug: { not: null } },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        slug: true,
        fullName: true,
        title: true,
        publishedAt: true,
        fileUrl: true,
      },
    });
    return rows.filter(
      (r): r is typeof r & { slug: string } => r.slug !== null,
    );
  } catch (error) {
    // The homepage must never fail because the library query did.
    console.error("Failed to load latest research:", error);
    return [];
  }
}

export default async function HomePage() {
  const latest = await getLatestResearch();

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${siteConfig.conferenceTitle} — ${siteConfig.school}, ${siteConfig.institution}`,
    description: siteConfig.theme,
    startDate: "2026-11-02",
    endDate: "2026-11-05",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: siteConfig.venueName,
      address: siteConfig.venueLocation,
    },
    organizer: {
      "@type": "Organization",
      name: `${siteConfig.school}, ${siteConfig.institution}`,
      url: siteConfig.appUrl,
    },
    url: siteConfig.appUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Hero />
      {/* <Highlights /> */}
      <Intro />
      <About />
      <ThemeBand />
      <Objectives />
      <SubThemes />
      <SpeakersSection />
      <CallForPapers />
      <Dates />
      <RegistrationSection />
      <Accommodation />
      <ResearchPreview papers={latest} />
      <Venue />
      <Contact />
      <FinalCta />
    </>
  );
}
