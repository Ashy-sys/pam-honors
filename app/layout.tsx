import "./globals.css";
import type { Metadata } from "next";
import Providers from "./providers/SessionProvider";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.startsWith("http")
      ? configuredUrl.replace(/\/$/, "")
      : `https://${configuredUrl.replace(/\/$/, "")}`;
  }

  return "https://pam-honors-rb8c.vercel.app";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PAM Honors | Pan Africa Music Honors Uganda",
    template: "%s | PAM Honors",
  },

  description:
    "PAM Honors, the Pan Africa Music Honors, celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",

  applicationName: "PAM Honors",

  keywords: [
    "PAM Honors",
    "Pan Africa Music Honors",
    "PAM Honors Uganda",
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
    siteName: "PAM Honors",
    title: "PAM Honors | Pan Africa Music Honors Uganda",
    description:
      "PAM Honors, the Pan Africa Music Honors, celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },

  twitter: {
    card: "summary",
    title: "PAM Honors | Pan Africa Music Honors Uganda",
    description:
      "PAM Honors, the Pan Africa Music Honors, celebrates Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "PAM Honors",
  alternateName: "Pan Africa Music Honors",
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "PAM Honors",
  alternateName: "Pan Africa Music Honors",
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
          <Navbar />

          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}