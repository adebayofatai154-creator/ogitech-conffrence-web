import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./site.css";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.appUrl),
  title: {
    default: `${siteConfig.conferenceTitle} | ${siteConfig.school}, ${siteConfig.institutionShort}`,
    template: `%s | ${siteConfig.institutionShort} Conference`,
  },
  description: `${siteConfig.conferenceTitle}, ${siteConfig.dates}, ${siteConfig.venueName}, ${siteConfig.venueLocation}. Theme: ${siteConfig.theme}.`,
  applicationName: `${siteConfig.institutionShort} Hybrid International Conference`,
  openGraph: {
    title: `${siteConfig.conferenceTitle} — ${siteConfig.institutionShort}`,
    description: siteConfig.theme,
    siteName: `${siteConfig.institution} — ${siteConfig.school}`,
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.conferenceTitle} — ${siteConfig.institutionShort}`,
    description: siteConfig.theme,
  },
  icons: { icon: "/logo.jpeg", apple: "/logo.jpeg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#03055A",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/montserrat-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
