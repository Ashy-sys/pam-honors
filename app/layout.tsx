import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers/SessionProvider";

import SiteChrome from "@/components/layout/SiteChrome";
import { getSiteUrl } from "@/lib/site-url";

import {
  Fraunces,
  Inter,
  JetBrains_Mono,
} from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PAMH | Pan Africa Music Honors",
    template: "%s | PAMH",
  },

  description:
    "Pan Africa Music Honors (PAMH) celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",

  applicationName: "PAMH",

  keywords: [
    "PAMH",
    "Pan Africa Music Honors",
    "PAMH Uganda",
    "Pan Africa Music Honors Uganda",
    "Uganda music awards",
    "Ugandan music",
    "music awards Uganda",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_UG",
    url: siteUrl,
    siteName: "PAMH",
    title: "PAMH | Pan Africa Music Honors",
    description:
      "Pan Africa Music Honors (PAMH) celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },

  twitter: {
    card: "summary",
    title: "PAMH | Pan Africa Music Honors",
    description:
      "Pan Africa Music Honors (PAMH) celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "PAMH",
  alternateName: "Pan Africa Music Honors Uganda",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "PAMH",
  alternateName: "Pan Africa Music Honors Uganda",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />

        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
