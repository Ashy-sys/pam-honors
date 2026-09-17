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

  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) {
    return `https://${productionHost.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PAM Honors | Pan Africa Music Honors",
    template: "%s | PAM Honors",
  },
  description:
    "PAM Honors celebrates excellence in Ugandan music through transparent recognition, public participation, and industry-led judging.",
  applicationName: "PAM Honors",
  keywords: [
    "PAM Honors",
    "Pan Africa Music Honors",
    "Uganda music awards",
    "Ugandan music",
    "music awards Uganda",
  ],
  alternates: {
    canonical: "/",
  },
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
    url: "/",
    siteName: "PAM Honors",
    title: "PAM Honors | Pan Africa Music Honors",
    description:
      "PAM Honors celebrates excellence in Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PAM Honors | Pan Africa Music Honors",
    description:
      "PAM Honors celebrates excellence in Ugandan music through transparent recognition, public participation, and industry-led judging.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        <Providers>
          <Navbar />

          <main>{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
